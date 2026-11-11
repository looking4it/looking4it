// =============================================================================================================================================================
// ============================================================ 3D GALLERY BACKGROUND ==========================================================================
// =============================================================================================================================================================
// Shows the NEWEST GALLERY Blender scene (models/gallery.glb) behind the page and lets visitors walk through it in first person.
//   Move:  W A S D   (hold Shift to walk faster)
//   Look:  arrow keys — or click the scene and move the mouse (Esc gives the mouse back), or drag a finger on touch screens.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { computeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';

const CONFIG = {
  model: 'models/gallery.glb',

  // Starting view (Blender coordinates, Z up): eye height 1.65 m, standing 2.45 m straight in front of the main door
  // (within clicking distance) and aimed at the door's centre so it sits in the middle of the frame.
  // (Originally the NEWEST GALLERY.blend viewport: location -13.7976, 0.2701, 1.6458; rotation 88.67°, -90.53°.)
  start: {
    location: [-12.7, 0.005, 1.6458],
    rotationXDeg: 84.64,
    rotationZDeg: -90,
  },
  // Blender's viewport at 50 mm shows ~71.5° horizontally.
  horizontalFovDeg: 71.5,

  walkSpeed: 2.2,   // metres per second
  runSpeed: 4.5,    // with Shift
  lookSpeed: 0.0022,          // mouse look sensitivity
  arrowTurnDegPerSec: 90,     // how fast the arrow keys turn the view (up/down tilt at 70% of this)
  bodyRadius: 0.3,  // how close you can get to walls
  stepHeight: 0.45, // how high a step you can walk up
  worldLimit: 35,   // metres from the gallery centre you can wander outside

  // Paintings you can click in the 3D gallery: Blender material name -> picture shown in the overlay.
  paintings: {
    'Waterfall': 'images/3d/waterfall.jpg',
    'mom-white copie': 'images/3d/mom-white-copie.jpg',
    'a0a51f48-ff6d-4654-a2d0-3abb228d95f0': 'images/3d/a0a51f48-ff6d-4654-a2d0-3abb228d95f0.jpg',
    '35886dce-783f-4b70-a4a3-81d396a437ca': 'images/3d/35886dce-783f-4b70-a4a3-81d396a437ca.jpg',
    '19497f0c-36ca-47ee-a987-b63529a2245b': 'images/3d/19497f0c-36ca-47ee-a987-b63529a2245b.jpg',
    '13e374f5-0286-4e61-8dd1-a4bfe591a18f': 'images/3d/13e374f5-0286-4e61-8dd1-a4bfe591a18f.jpg',
    '5e57eb2c-3f8b-4285-ac14-7879273a14da': 'images/3d/5e57eb2c-3f8b-4285-ac14-7879273a14da.jpg',
    '1f3872ee-60ab-4ee2-911e-27e960353647': 'images/3d/1f3872ee-60ab-4ee2-911e-27e960353647.jpg',
  },
  // How close (metres) you must be before a painting or the door can be clicked — walk up to it first.
  clickDistance: { painting: 3, door: 3 },

  // Clicking a painting that's further away than that quickly carries you up to stand right in front of it
  // (the cursor shows the magnifying glass with no word). If a wall is in the way, it fades through instead of gliding through the wall.
  paintingTravel: {
    maxDistance: 40,       // metres: paintings further than this can't be clicked at all
    speed: 7,              // metres per second for the glide...
    minTime: 0.6,          // ...but never quicker than this
    maxTime: 1.6,          // ...or slower than this (seconds)
    standDistance: [1.4, 2.4], // how far in front of the painting you end up (bigger paintings: further back)
  },
  // Clicks pass through plants (by material name), so a painting partly hidden behind leaves can still be clicked.
  clickThrough: /HOJA|Leaf|Leaves|Plant|Branch|Grass|Ground_Cover|Flower|dandelion/i,

  // The main entrance door. Clicking it glides you up to it, fades to white, and brings you in just inside the
  // gallery (all positions in Blender coordinates).
  door: {
    material: 'Mansion_Door',
    approach: [-11.0, 0, 0],     // where the glide ends, just in front of the door
    arriveFrom: [-5.2, 0, 0],    // where you reappear inside, in front of the Waterfall wall...
    arriveAt: [-3.9, 0, 0],      // ...and drift forward to, where you get control back
    faceDeg: -90,                // facing into the gallery (same convention as start.rotationZDeg)
    timing: [1.3, 0.25, 1.2],    // seconds: glide to the door, hold white, fade in inside
  },

  // Lighting, calibrated on 2026-11-05 against Blender's rendered viewport (EEVEE, AgX) from three viewpoints
  // (outside the entrance, inside by the windows, and an unlit interior wall) so the web view matches Blender.
  lighting: {
    exposure: 0.9,     // overall brightness
    ambient: 0.06,     // flat fill light (Blender's dim grey world)
    reflections: 0.03, // soft environment reflections on glossy/metal surfaces
    sun: 0.15,         // warm "Sun.001" light, as a fraction of its physical Blender strength
    lamps: 0.75,       // spotlights and ceiling light, as a fraction of their physical Blender strength
  },
};

// Blender (x, y, z) with Z up  ->  three.js (x, z, -y) with Y up.
const fromBlender = ([x, y, z]) => new THREE.Vector3(x, z, -y);

const container = document.getElementById('background');
const drawer = document.getElementById('galleryDrawer');

if (container && hasWebGL()) {
  start().catch((err) => {
    console.error('3D gallery failed to load:', err);
    setStatus('');
  });
}

async function start() {
  THREE.Mesh.prototype.raycast = acceleratedRaycast;
  THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;

  // ---------------- Renderer ----------------
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.AgXToneMapping; // matches Blender's AgX view transform
  renderer.toneMappingExposure = CONFIG.lighting.exposure;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false; // the scene never moves, so shadows are drawn once
  renderer.domElement.setAttribute('aria-label', '3D gallery. Use W A S D to walk and the arrow keys or mouse to look around.');
  renderer.domElement.tabIndex = 0;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d0d);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.05, 1500);
  camera.rotation.order = 'YXZ';
  const startPos = fromBlender(CONFIG.start.location);
  const startYaw = THREE.MathUtils.degToRad(CONFIG.start.rotationZDeg);
  const startPitch = THREE.MathUtils.degToRad(CONFIG.start.rotationXDeg - 90);
  camera.position.copy(startPos);
  let yaw = startYaw;
  let pitch = startPitch;

  // Soft reflections for metal/glossy materials, and the dim grey ambient light of the Blender world.
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = CONFIG.lighting.reflections;
  scene.add(new THREE.AmbientLight(0xffffff, CONFIG.lighting.ambient));

  // The warm "Sun.001" area light in Blender (100 000 W, ~25 m south-west of the gallery). glTF can't carry area
  // lights, so it is recreated here at the same spot and facing the same way (physical strength = W / π).
  const sun = new THREE.SpotLight(new THREE.Color(1, 0.78, 0.24), (100000 / Math.PI) * CONFIG.lighting.sun, 0, 1.05, 0.35, 2);
  sun.position.copy(fromBlender([-17.19, -20.46, 15.3]));
  sun.target.position.copy(sun.position).add(fromBlender([0.665, 0.572, -0.48]).multiplyScalar(20));
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.camera.near = 5;
  sun.shadow.camera.far = 90;
  sun.shadow.bias = -0.0008;
  // No normal offset: the building's outer walls face inward in the model, and an offset would push them into
  // their own shadow (that made the whole entrance facade look unlit).
  sun.shadow.normalBias = 0;
  scene.add(sun, sun.target);

  // The square "Area" light under the ceiling.
  const ceiling = new THREE.PointLight(0xffffff, (500 / (4 * Math.PI)) * CONFIG.lighting.lamps, 0, 2);
  ceiling.position.copy(fromBlender([0, 0, 6.0]));
  scene.add(ceiling);

  // ---------------- Model ----------------
  setStatus('Loading gallery… 0%');
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync(CONFIG.model, (e) => {
    if (e.total) setStatus(`Loading gallery… ${Math.round((e.loaded / e.total) * 100)}%`);
  });
  const world = gltf.scene;
  scene.add(world);
  world.updateMatrixWorld(true);

  const colliders = [];
  world.traverse((obj) => {
    if (obj.isLight) {
      // Blender exports lights in candela (W × 683 / 4π); three.js wants Blender's own scale (W / 4π).
      obj.intensity = (obj.intensity / 683) * CONFIG.lighting.lamps;
      obj.castShadow = false;
    }
    if (obj.isMesh) {
      obj.geometry.computeBoundingSphere();
      const huge = obj.geometry.boundingSphere.radius * obj.getWorldScale(new THREE.Vector3()).x > 100;
      if (huge) {
        // The blue sky dome: never blocks light or the visitor.
        obj.castShadow = false;
        obj.receiveShadow = false;
        return;
      }
      obj.castShadow = true;
      obj.receiveShadow = true;
      obj.geometry.computeBoundsTree();
      colliders.push(obj);
    }
  });
  renderer.shadowMap.needsUpdate = true;

  // ---------------- Walking ----------------
  const ray = new THREE.Raycaster();
  ray.firstHitOnly = true;
  const DOWN = new THREE.Vector3(0, -1, 0);

  const floorBelow = (x, footY, z) => {
    ray.set(new THREE.Vector3(x, footY + CONFIG.stepHeight, z), DOWN);
    ray.far = CONFIG.stepHeight + 3;
    const hit = ray.intersectObjects(colliders, false)[0];
    return hit ? hit.point.y : null;
  };

  // Eye height above the floor at the starting spot (≈1.65 m in Blender). Outside the building there is no ground
  // mesh (only the sky dome far below), so open ground is treated as flat at the starting floor level.
  const startFloor = floorBelow(startPos.x, startPos.y - 1.6, startPos.z);
  const eyeHeight = startFloor === null ? 1.65 : startPos.y - startFloor;
  const groundY = startPos.y - eyeHeight;
  const inBounds = (x, z) => Math.abs(x) < CONFIG.worldLimit && Math.abs(z) < CONFIG.worldLimit;

  const blocked = (from, dir, dist, feetY) => {
    for (const h of [CONFIG.stepHeight + 0.05, eyeHeight * 0.6, eyeHeight]) {
      ray.set(new THREE.Vector3(from.x, feetY + h, from.z), dir);
      ray.far = dist + CONFIG.bodyRadius;
      if (ray.intersectObjects(colliders, false).length) return true;
    }
    return false;
  };

  const keys = new Set();
  // W A S D walk; the arrow keys turn and tilt the view.
  const KEYMAP = {
    KeyW: 'f', KeyS: 'b', KeyA: 'l', KeyD: 'r',
    ArrowLeft: 'turnL', ArrowRight: 'turnR', ArrowUp: 'lookUp', ArrowDown: 'lookDown',
  };
  const drawerOpen = () => drawer?.classList.contains('is-open');
  const typing = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

  window.addEventListener('keydown', (e) => {
    const k = KEYMAP[e.code];
    if (!k || drawerOpen() || paintingOpen || busy() || typing(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
    e.preventDefault();
    keys.add(k);
    hideControls(); // they've used W A S D / an arrow key, so the instructions can go
    hideHint();
  });
  window.addEventListener('keyup', (e) => { const k = KEYMAP[e.code]; if (k) keys.delete(k); });
  let shiftHeld = false;
  window.addEventListener('keydown', (e) => { if (e.key === 'Shift') shiftHeld = true; });
  window.addEventListener('keyup', (e) => { if (e.key === 'Shift') shiftHeld = false; });
  window.addEventListener('blur', () => { keys.clear(); shiftHeld = false; });

  // Mouse look (pointer lock) and touch-drag look.
  const canvas = renderer.domElement;
  const look = (dx, dy) => {
    hidePrompt();
    yaw -= dx * CONFIG.lookSpeed;
    pitch = THREE.MathUtils.clamp(pitch - dy * CONFIG.lookSpeed, -1.45, 1.45);
  };
  // ---------------- Clickable things: paintings (LOOK) and the main door (OPEN) ----------------
  const pointer = new THREE.Vector2();
  const pickRay = new THREE.Raycaster();
  pickRay.far = CONFIG.paintingTravel.maxDistance;
  const locked = () => document.pointerLockElement === canvas;
  // What is under the pointer (or under the centre of the screen while the mouse is captured)?
  // Returns { kind: 'painting', src } (close enough to look at), { kind: 'goto', hit } (a painting further away),
  // { kind: 'door' }, or null.
  const targetAt = (clientX, clientY) => {
    if (locked() || clientX === undefined) pointer.set(0, 0);
    else pointer.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
    pickRay.setFromCamera(pointer, camera);
    const hits = pickRay.intersectObjects(colliders, false)
      .filter((h) => !CONFIG.clickThrough.test(h.object.material.name));
    if (!hits.length) return null;
    // Only things at the front count, but a frame can sit a hair in front of its canvas, so allow a few cm.
    const front = hits.filter((h) => h.distance <= hits[0].distance + 0.15);
    const painting = front.find((h) => CONFIG.paintings[h.object.material.name]);
    if (painting) {
      return painting.distance <= CONFIG.clickDistance.painting
        ? { kind: 'painting', src: CONFIG.paintings[painting.object.material.name] }
        : { kind: 'goto', hit: painting };
    }
    const door = front.find((h) => h.object.material.name === CONFIG.door.material);
    if (door) return door.distance <= CONFIG.clickDistance.door ? { kind: 'door' } : null;
    return null;
  };

  const view = createPaintingView(() => {
    paintingOpen = false;
    canvas.focus({ preventScroll: true });
  });
  let paintingOpen = false;
  const openPainting = (src) => {
    hidePrompt();
    paintingOpen = true;
    keys.clear();
    if (locked()) document.exitPointerLock();
    hideHint();
    cursor.hide();
    view.open(src);
  };

  // Walking through the main door: glide up to it, fade to white, fade back in just inside the gallery.
  const fade = createFade();
  let entering = null;
  const enterThroughDoor = () => {
    hidePrompt();
    keys.clear();
    hideHint();
    const doorFront = fromBlender(CONFIG.door.approach).setY(feetY + eyeHeight);
    entering = {
      t: 0,
      from: camera.position.clone(), fromYaw: yaw, fromPitch: pitch,
      doorFront, inside: fromBlender(CONFIG.door.arriveFrom), arrive: fromBlender(CONFIG.door.arriveAt),
      faceYaw: THREE.MathUtils.degToRad(CONFIG.door.faceDeg),
    };
  };
  const ease = (x) => x * x * (3 - 2 * x);
  const shortestAngle = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));
  const stepEntering = (dt) => {
    const e = entering;
    e.t += dt;
    const [glide, hold, settle] = CONFIG.door.timing;
    if (e.t < glide) {
      // 1. Turn toward the door and glide up to it, fading to white near the end.
      const k = ease(e.t / glide);
      camera.position.lerpVectors(e.from, e.doorFront, k);
      yaw = e.fromYaw + shortestAngle(e.fromYaw, e.faceYaw) * k;
      pitch = e.fromPitch * (1 - k);
      fade.set(Math.max(0, (e.t / glide - 0.45) / 0.55));
    } else if (e.t < glide + hold) {
      fade.set(1);
    } else if (e.t < glide + hold + settle) {
      // 2. Appear just inside the gallery and drift forward as the white fades away.
      const k = (e.t - glide - hold) / settle;
      const floor = floorBelow(e.arrive.x, 0, e.arrive.z) ?? groundY;
      feetY = floor;
      camera.position.lerpVectors(e.inside, e.arrive, 1 - (1 - k) * (1 - k)).setY(floor + eyeHeight);
      yaw = e.faceYaw;
      pitch = 0;
      fade.set(1 - ease(k));
    } else {
      camera.position.copy(e.arrive).setY(feetY + eyeHeight);
      fade.set(0);
      entering = null;
      showControls(); // now inside the gallery: show how to walk and look around
      showHint();
    }
  };

  // Going to a painting that was clicked from further away: end up standing right in front of it, facing it.
  let travelling = null;
  const busy = () => Boolean(entering || travelling);
  const goToPainting = (hit) => {
    hidePrompt();
    hideHint();
    keys.clear();
    const T = CONFIG.paintingTravel;
    const box = new THREE.Box3().setFromObject(hit.object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Which way the painting faces (flat on the floor plane), pointing towards the visitor's side of the wall.
    const toViewer = new THREE.Vector3().subVectors(camera.position, center).setY(0);
    const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld).setY(0);
    if (normal.lengthSq() < 1e-6) normal.copy(toViewer);
    normal.normalize();
    if (normal.dot(toViewer) < 0) normal.negate();

    // Stand far enough back to see the whole painting, but not so far back that we end up inside something.
    const span = Math.max(size.y, Math.hypot(size.x, size.z));
    let dist = THREE.MathUtils.clamp(span * 1.1 + 0.5, T.standDistance[0], T.standDistance[1]);
    ray.set(center.clone().addScaledVector(normal, 0.05), normal);
    ray.far = dist + CONFIG.bodyRadius;
    const behind = ray.intersectObjects(colliders, false)[0];
    if (behind) dist = Math.max(0.8, behind.distance - CONFIG.bodyRadius);

    const stand = center.clone().addScaledVector(normal, dist);
    const floor = floorBelow(stand.x, feetY, stand.z) ?? groundY;
    stand.y = floor + eyeHeight;
    const toYaw = Math.atan2(-(center.x - stand.x), -(center.z - stand.z));
    const toPitch = Math.atan2(center.y - stand.y, dist);

    // Glide straight there if the way is clear; otherwise fade through (never through a wall).
    const path = new THREE.Vector3().subVectors(stand, camera.position).setY(0);
    const length = path.length();
    const clear = length < 0.01 || !blocked(camera.position, path.clone().normalize(), length, feetY);
    travelling = {
      t: 0,
      duration: clear ? THREE.MathUtils.clamp(length / T.speed, T.minTime, T.maxTime) : 0.8,
      fadeThrough: !clear,
      from: camera.position.clone(), fromYaw: yaw, fromPitch: pitch,
      to: stand, toYaw: yaw + shortestAngle(yaw, toYaw), toPitch, floor,
    };
  };
  const stepTravel = (dt) => {
    const tr = travelling;
    tr.t += dt;
    const k = Math.min(1, tr.t / tr.duration);
    if (tr.fadeThrough) {
      // Fade to white, jump in front of the painting at the halfway point, fade back in.
      if (k < 0.5) {
        fade.set(ease(k * 2));
      } else {
        camera.position.copy(tr.to);
        yaw = tr.toYaw;
        pitch = tr.toPitch;
        fade.set(1 - ease((k - 0.5) * 2));
      }
    } else {
      const e = ease(k);
      camera.position.lerpVectors(tr.from, tr.to, e);
      yaw = THREE.MathUtils.lerp(tr.fromYaw, tr.toYaw, e);
      pitch = THREE.MathUtils.lerp(tr.fromPitch, tr.toPitch, e);
    }
    if (k >= 1) {
      camera.position.copy(tr.to);
      yaw = tr.toYaw;
      pitch = tr.toPitch;
      feetY = tr.floor;
      if (tr.fadeThrough) fade.set(0);
      travelling = null;
    }
  };

  canvas.addEventListener('click', (e) => {
    if (drawerOpen() || paintingOpen || busy()) return;
    const target = targetAt(e.clientX, e.clientY);
    if (target?.kind === 'painting') openPainting(target.src);
    else if (target?.kind === 'goto') goToPainting(target.hit);
    else if (target?.kind === 'door') enterThroughDoor();
    else if (!locked()) { hidePrompt(); canvas.requestPointerLock?.(); }
  });

  // Custom cursor: an arrow normally; a magnifying glass labelled LOOK (paintings) or OPEN (door) over clickables.
  const cursor = createCursor();
  let mouse = null; // last mouse position over the 3D view
  canvas.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return; // touch screens keep their normal behaviour
    mouse = { x: e.clientX, y: e.clientY };
    cursor.moveTo(mouse.x, mouse.y);
  });
  canvas.addEventListener('pointerleave', () => { mouse = null; });
  let lastHoverCheck = 0;
  const updateCursor = (now) => {
    const usable = !drawerOpen() && !paintingOpen && !busy() && (mouse || locked());
    if (!usable) { cursor.hide(); return; }
    if (locked()) cursor.moveTo(window.innerWidth / 2, window.innerHeight / 2);
    if (now - lastHoverCheck < 80) return; // a dozen checks a second is plenty
    lastHoverCheck = now;
    const target = locked() ? targetAt() : targetAt(mouse.x, mouse.y);
    const labels = { door: 'OPEN', painting: 'LOOK', goto: '' }; // far-away painting: magnifying glass, no word
    cursor.show(target ? labels[target.kind] : null);
  };
  document.addEventListener('mousemove', (e) => {
    if (locked() && !busy()) look(e.movementX, e.movementY);
  });
  let touch = null;
  canvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') { touch = { x: e.clientX, y: e.clientY }; hideHint(); }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!touch || e.pointerType === 'mouse') return;
    look(-(e.clientX - touch.x) * 2, -(e.clientY - touch.y) * 2);
    touch = { x: e.clientX, y: e.clientY };
  });
  const endTouch = () => { touch = null; };
  canvas.addEventListener('pointerup', endTouch);
  canvas.addEventListener('pointercancel', endTouch);
  canvas.style.touchAction = 'none';

  // Opening the gallery drawer releases the mouse and stops walking.
  let drawerSettled = false;
  let settleTimer;
  if (drawer) {
    new MutationObserver(() => {
      clearTimeout(settleTimer);
      drawerSettled = false;
      if (drawerOpen()) {
        keys.clear();
        if (paintingOpen) view.close();
        cursor.hide();
        hidePrompt();
        if (document.pointerLockElement === canvas) document.exitPointerLock();
        settleTimer = setTimeout(() => { drawerSettled = true; }, 1000); // after the slide animation
      }
    }).observe(drawer, { attributes: true, attributeFilter: ['class'] });
  }

  // ---------------- Resize ----------------
  const fit = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    const hfov = THREE.MathUtils.degToRad(CONFIG.horizontalFovDeg);
    const vfov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(hfov / 2) / camera.aspect));
    camera.fov = THREE.MathUtils.clamp(vfov, 35, 80);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', fit);
  fit();

  // ---------------- Loop ----------------
  const clock = new THREE.Clock();
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const move = new THREE.Vector3();
  let feetY = camera.position.y - eyeHeight;

  const step = (axis, amount) => {
    if (!amount) return;
    const dir = new THREE.Vector3();
    dir[axis] = Math.sign(amount);
    const pos = camera.position;
    if (blocked(pos, dir, Math.abs(amount), feetY)) return;
    const nx = axis === 'x' ? pos.x + amount : pos.x;
    const nz = axis === 'z' ? pos.z + amount : pos.z;
    if (!inBounds(nx, nz)) return; // invisible fence around the grounds
    const floor = floorBelow(nx, feetY, nz) ?? groundY;
    pos.x = nx;
    pos.z = nz;
    feetY = floor;
  };

  renderer.setAnimationLoop((now) => {
    const dt = Math.min(clock.getDelta(), 0.05);
    // While the gallery drawer is fully open, or a painting is being viewed, the scene sits still behind it:
    // skip drawing to save battery (the last frame stays on screen).
    if ((drawerOpen() && drawerSettled) || paintingOpen) return;

    if (entering || travelling) {
      if (entering) stepEntering(dt);
      else stepTravel(dt);
      cursor.hide();
      camera.rotation.set(pitch, yaw, 0);
      renderer.render(scene, camera);
      return;
    }
    updateCursor(now);

    if (keys.size) {
      const turn = THREE.MathUtils.degToRad(CONFIG.arrowTurnDegPerSec) * dt;
      if (keys.has('turnL')) yaw += turn;
      if (keys.has('turnR')) yaw -= turn;
      if (keys.has('lookUp')) pitch = Math.min(1.45, pitch + turn * 0.7);
      if (keys.has('lookDown')) pitch = Math.max(-1.45, pitch - turn * 0.7);

      forward.set(-Math.sin(yaw), 0, -Math.cos(yaw));
      right.set(-forward.z, 0, forward.x);
      move.set(0, 0, 0);
      if (keys.has('f')) move.add(forward);
      if (keys.has('b')) move.sub(forward);
      if (keys.has('r')) move.add(right);
      if (keys.has('l')) move.sub(right);
      if (move.lengthSq()) {
        move.normalize().multiplyScalar((shiftHeld ? CONFIG.runSpeed : CONFIG.walkSpeed) * dt);
        step('x', move.x);
        step('z', move.z);
      }
    }
    // Ease the eye height onto the floor (smooth stairs).
    const targetY = feetY + eyeHeight;
    camera.position.y += (targetY - camera.position.y) * Math.min(1, dt * 12);

    camera.rotation.set(pitch, yaw, 0);
    renderer.render(scene, camera);
  });

  setStatus('');
  const help = createHelp(() => { hidePrompt(); hideHint(); }); // the instructions replace the on-screen hints
  if (drawer) {
    new MutationObserver(() => { if (drawerOpen()) help.close(); })
      .observe(drawer, { attributes: true, attributeFilter: ['class'] });
  }
  if (!drawerOpen()) showPrompt(); // "CLICK TO ENTER" over the door until the visitor does anything
  // Handy for tweaking from the browser console, e.g. gallery3d.setView(x, z, yawDeg) to jump somewhere.
  window.gallery3d = {
    THREE, scene, camera, renderer, sun, targetAt,
    setView(x, z, yawDeg, pitchDeg = 0) {
      const floor = floorBelow(x, groundY, z) ?? groundY;
      feetY = floor;
      camera.position.set(x, floor + eyeHeight, z);
      yaw = THREE.MathUtils.degToRad(yawDeg);
      pitch = THREE.MathUtils.degToRad(pitchDeg);
    },
  };
}

// ---------------- Helpers ----------------
function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && c.getContext('webgl2'));
  } catch {
    return false;
  }
}

function setStatus(text) {
  let el = document.getElementById('galleryStatus');
  if (!el) {
    el = document.createElement('div');
    el.id = 'galleryStatus';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.hidden = !text;
}

// The mouse pointer over the 3D view: an arrow, or a slightly bigger magnifying glass with a word above it
// (LOOK / OPEN) when something clickable is under it.
function createCursor() {
  const el = document.createElement('div');
  el.id = 'galleryCursor';
  el.setAttribute('aria-hidden', 'true');
  el.hidden = true;
  el.innerHTML = `
    <svg class="cursor-arrow" viewBox="0 0 34 34" width="22" height="22">
      <path d="M3 3 L29.8 14.2 L22.7 17.5 L31 25.4 L25.4 31 L17.5 23.3 L14.1 29.8 Z"
            fill="#fff" stroke="#000" stroke-width="2.6" stroke-linejoin="round"/>
    </svg>
    <div class="cursor-look">
      <span class="cursor-label"></span>
      <svg viewBox="0 0 32 32" width="32" height="32">
        <g fill="none" stroke-linecap="round">
          <circle cx="13" cy="13" r="8.5" stroke="#fff" stroke-width="6"/>
          <line x1="19.5" y1="19.5" x2="27.5" y2="27.5" stroke="#fff" stroke-width="6.5"/>
          <circle cx="13" cy="13" r="8.5" stroke="#000" stroke-width="3"/>
          <line x1="19.5" y1="19.5" x2="27.5" y2="27.5" stroke="#000" stroke-width="3.4"/>
        </g>
      </svg>
    </div>
  `;
  document.body.appendChild(el);
  const label = el.querySelector('.cursor-label');
  return {
    moveTo(x, y) { el.style.transform = `translate(${x}px, ${y}px)`; },
    // word: null = arrow; '' = magnifying glass with no word; otherwise magnifying glass with that word above it.
    show(word) {
      el.hidden = false;
      el.classList.toggle('is-look', word != null);
      if (word != null && label.textContent !== word) label.textContent = word;
    },
    hide() { el.hidden = true; },
  };
}

// Soft white fade used when walking through the door.
function createFade() {
  const el = document.createElement('div');
  el.id = 'galleryFade';
  document.body.appendChild(el);
  return {
    set(v) {
      el.style.opacity = String(v);
      el.style.visibility = v > 0 ? 'visible' : 'hidden';
    },
  };
}

// Full-screen overlay: the 3D view goes blurry and lighter, the painting on the left, "PAINTING" on the right.
// Click anywhere or press Esc to go back.
function createPaintingView(onClose) {
  const el = document.createElement('div');
  el.id = 'paintingView';
  el.hidden = true;
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Painting. Click anywhere or press Escape to return to the gallery.');
  el.tabIndex = -1;
  el.innerHTML = `
    <div class="painting-view-image"><img alt="Painting"></div>
    <p class="painting-view-label">Painting</p>
  `;
  document.body.appendChild(el);
  const img = el.querySelector('img');

  let isOpen = false;
  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    el.classList.remove('is-open');
    setTimeout(() => { if (!isOpen) el.hidden = true; }, 350);
    onClose();
  };
  el.addEventListener('click', close);
  window.addEventListener('keydown', (e) => {
    if (isOpen && e.key === 'Escape') { e.preventDefault(); close(); }
  });

  return {
    open(src) {
      isOpen = true;
      img.src = src;
      el.hidden = false;
      requestAnimationFrame(() => el.classList.add('is-open')); // next frame, so it fades in
      el.focus({ preventScroll: true });
    },
    close,
  };
}

// Big centred "CLICK TO ENTER" shown when the page loads (the door is in the middle of the starting view).
// Clicks pass straight through it to the door. It goes away for good once the visitor clicks, walks or looks around.
let promptEl;
function showPrompt() {
  promptEl = document.createElement('div');
  promptEl.id = 'galleryPrompt';
  promptEl.innerHTML = `
    <span class="prompt-main">Click to enter</span>
    <span class="prompt-sub">Use ‘W A S D’ keys to move and <span class="prompt-arrows" aria-label="arrow keys">↑ ↓ ← →</span> to look around</span>
  `;
  document.body.appendChild(promptEl);
}
// Clicking, looking around with the mouse, etc. fade "CLICK TO ENTER" (and the "ExpoStudios" title).
// The "USE W A S D … TO LOOK AROUND" line only appears once the visitor has gone through the door, and then
// stays on screen until they actually press one of those keys.
function showControls() {
  promptEl?.classList.add('is-controls-shown');
}
function hidePrompt() {
  document.getElementById('siteTitle')?.classList.add('is-hidden');
  promptEl?.classList.add('is-main-hidden');
}
function hideControls() {
  hidePrompt();
  if (!promptEl) return;
  const el = promptEl;
  promptEl = null;
  el.classList.add('is-hidden');
  setTimeout(() => el.remove(), 600);
}

let hintEl;
function showHint() {
  if (hintEl) return; // only the first time through the door
  hintEl = document.createElement('div');
  hintEl.id = 'galleryHint';
  hintEl.textContent = 'W A S D to walk · Arrow keys or click + mouse to look around · Click a painting to go to it, click again to look · Shift to walk faster · Esc to release the mouse';
  document.body.appendChild(hintEl);
  setTimeout(hideHint, 12000);
}
function hideHint() {
  if (hintEl && !hintEl.classList.contains('is-hidden')) hintEl.classList.add('is-hidden');
}

// Circled "?" in the top right corner of the 3D view: click it for the moving instructions.
function createHelp(onOpen = () => {}) {
  const key = (k, label = k) => `<kbd aria-label="${label}">${k}</kbd>`;
  const button = document.createElement('button');
  button.id = 'galleryHelpButton';
  button.type = 'button';
  button.setAttribute('aria-label', 'How to move around');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'galleryHelp');
  button.innerHTML = `
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="1.4"/>
      <text x="16" y="21.5" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="currentColor">?</text>
    </svg>`;

  const panel = document.createElement('div');
  panel.id = 'galleryHelp';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'How to move around');
  panel.innerHTML = `
    <h2>How to move around</h2>
    <dl>
      <dt>${key('W')}${key('A')}${key('S')}${key('D')}</dt>
      <dd>Walk forward, left, back and right</dd>
      <dt>${key('↑', 'up arrow')}${key('↓', 'down arrow')}${key('←', 'left arrow')}${key('→', 'right arrow')}</dt>
      <dd>Look up, down, left and right</dd>
      <dt>${key('Shift')}</dt>
      <dd>Hold while walking to go faster</dd>
      <dt>Click + mouse</dt>
      <dd>Look around with the mouse (${key('Esc')} lets go of it)</dd>
      <dt>Click a painting</dt>
      <dd>From afar it takes you right up to it; click it again to look at it</dd>
      <dt>Click the door</dt>
      <dd>Walk up to it and click to go inside</dd>
    </dl>`;

  document.body.append(button, panel);

  const setOpen = (open) => {
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    button.classList.toggle('is-open', open);
    if (open) onOpen();
  };
  button.addEventListener('click', () => setOpen(panel.hidden));
  // Clicking anywhere else, or Esc, closes it.
  document.addEventListener('pointerdown', (e) => {
    if (!panel.hidden && !panel.contains(e.target) && !button.contains(e.target)) setOpen(false);
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  return { close: () => setOpen(false) };
}
