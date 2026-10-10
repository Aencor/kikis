import * as THREE from 'three';

export default {
  init() {
    const container = document.getElementById('cat-3d-canvas');
    if (!container) return;

    // Check WebGL support
    try {
      const canvasTest = document.createElement('canvas');
      if (!window.WebGLRenderingContext || (!canvasTest.getContext('webgl') && !canvasTest.getContext('experimental-webgl'))) {
        return;
      }
    } catch (e) {
      return;
    }

    // Hide fallback static cat if 3D loads
    const fallbackCat = document.querySelector('.hero-art .cat.cat-fallback');
    if (fallbackCat) {
      fallbackCat.style.display = 'none';
    }

    // Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 5.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Color Palette
    const colors = {
      white: 0xfffdfb,
      pink: 0xf5bfd4,
      pinkLight: 0xfceaf1,
      purple: 0x9874d1,
      purpleDark: 0x7650ad,
      dark: 0x171417,
      shadow: 0x54327a,
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    mainLight.position.set(3, 5, 4);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xd9c5f8, 1.2);
    fillLight.position.set(-4, -1, 3);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xf5bfd4, 2.5, 10);
    backLight.position.set(0, 2, -2.5);
    scene.add(backLight);

    // Materials
    const furMaterial = new THREE.MeshStandardMaterial({
      color: colors.white,
      roughness: 0.35,
      metalness: 0.02,
    });

    const innerEarMaterial = new THREE.MeshStandardMaterial({
      color: colors.pink,
      roughness: 0.5,
    });

    const irisMaterial = new THREE.MeshStandardMaterial({
      color: colors.purple,
      roughness: 0.15,
      metalness: 0.1,
    });

    const pupilMaterial = new THREE.MeshBasicMaterial({
      color: colors.dark,
    });

    const glintMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const noseMaterial = new THREE.MeshStandardMaterial({
      color: colors.purpleDark,
      roughness: 0.3,
    });

    const whiskerMaterial = new THREE.MeshBasicMaterial({
      color: colors.dark,
    });

    const starMaterial = new THREE.MeshStandardMaterial({
      color: colors.purple,
      emissive: colors.purpleDark,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.3,
    });

    // Main Cat Group
    const catGroup = new THREE.Group();
    scene.add(catGroup);

    // 1. Head
    const headGroup = new THREE.Group();
    catGroup.add(headGroup);

    const headGeo = new THREE.SphereGeometry(1.25, 48, 48);
    headGeo.scale(1.12, 0.98, 0.92);
    const headMesh = new THREE.Mesh(headGeo, furMaterial);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Cheeks
    const cheekLeftGeo = new THREE.SphereGeometry(0.5, 24, 24);
    cheekLeftGeo.scale(1, 0.7, 0.6);
    const cheekLeft = new THREE.Mesh(cheekLeftGeo, furMaterial);
    cheekLeft.position.set(-0.45, -0.3, 0.85);
    headGroup.add(cheekLeft);

    const cheekRight = cheekLeft.clone();
    cheekRight.position.set(0.45, -0.3, 0.85);
    headGroup.add(cheekRight);

    // 2. Ears
    const earGroupLeft = new THREE.Group();
    const earGroupRight = new THREE.Group();

    const earGeo = new THREE.ConeGeometry(0.55, 1.1, 4);
    earGeo.scale(1, 1, 0.45);
    
    // Left Ear
    const earLeft = new THREE.Mesh(earGeo, furMaterial);
    earLeft.position.set(0, 0.55, 0);
    earGroupLeft.add(earLeft);

    const innerEarGeo = new THREE.ConeGeometry(0.35, 0.75, 4);
    innerEarGeo.scale(1, 1, 0.4);
    const innerEarLeft = new THREE.Mesh(innerEarGeo, innerEarMaterial);
    innerEarLeft.position.set(0, 0.48, 0.08);
    earGroupLeft.add(innerEarLeft);

    earGroupLeft.position.set(-0.85, 0.95, 0);
    earGroupLeft.rotation.z = 0.38;
    earGroupLeft.rotation.x = -0.1;
    headGroup.add(earGroupLeft);

    // Right Ear
    const earRight = new THREE.Mesh(earGeo, furMaterial);
    earRight.position.set(0, 0.55, 0);
    earGroupRight.add(earRight);

    const innerEarRight = new THREE.Mesh(innerEarGeo, innerEarMaterial);
    innerEarRight.position.set(0, 0.48, 0.08);
    earGroupRight.add(innerEarRight);

    earGroupRight.position.set(0.85, 0.95, 0);
    earGroupRight.rotation.z = -0.38;
    earGroupRight.rotation.x = -0.1;
    headGroup.add(earGroupRight);

    // 3. Eyes
    const createEye = (isLeft) => {
      const eyeGroup = new THREE.Group();

      // Iris
      const irisGeo = new THREE.SphereGeometry(0.24, 32, 32);
      irisGeo.scale(0.85, 1.15, 0.45);
      const iris = new THREE.Mesh(irisGeo, irisMaterial);
      eyeGroup.add(iris);

      // Pupil
      const pupilGeo = new THREE.SphereGeometry(0.14, 24, 24);
      pupilGeo.scale(0.65, 1.1, 0.45);
      const pupil = new THREE.Mesh(pupilGeo, pupilMaterial);
      pupil.position.set(0, 0, 0.06);
      eyeGroup.add(pupil);

      // Glint
      const glintGeo = new THREE.SphereGeometry(0.055, 16, 16);
      const glint = new THREE.Mesh(glintGeo, glintMaterial);
      glint.position.set(0.06, 0.08, 0.12);
      eyeGroup.add(glint);

      eyeGroup.position.set(isLeft ? -0.48 : 0.48, 0.12, 1.02);
      return { group: eyeGroup, pupil, iris };
    };

    const eyeLeftObj = createEye(true);
    const eyeRightObj = createEye(false);
    headGroup.add(eyeLeftObj.group);
    headGroup.add(eyeRightObj.group);

    // 4. Nose
    const noseGeo = new THREE.ConeGeometry(0.12, 0.15, 3);
    noseGeo.rotateZ(Math.PI);
    noseGeo.scale(1.2, 0.9, 0.6);
    const nose = new THREE.Mesh(noseGeo, noseMaterial);
    nose.position.set(0, -0.14, 1.18);
    headGroup.add(nose);

    // 5. Whiskers
    const whiskerGeo = new THREE.CylinderGeometry(0.012, 0.008, 0.75, 8);
    whiskerGeo.rotateZ(Math.PI / 2);

    const whiskers = [];
    const addWhisker = (x, y, z, rotZ, rotY) => {
      const w = new THREE.Mesh(whiskerGeo, whiskerMaterial);
      w.position.set(x, y, z);
      w.rotation.z = rotZ;
      w.rotation.y = rotY;
      headGroup.add(w);
      whiskers.push({ mesh: w, baseRotZ: rotZ });
    };

    // Left Whiskers
    addWhisker(-0.85, -0.18, 0.8, 0.12, -0.3);
    addWhisker(-0.82, -0.32, 0.78, -0.1, -0.3);

    // Right Whiskers
    addWhisker(0.85, -0.18, 0.8, -0.12, 0.3);
    addWhisker(0.82, -0.32, 0.78, 0.1, 0.3);

    // 6. Floating Sparkles / Orbiting Stars
    const sparkGeo = new THREE.OctahedronGeometry(0.2, 0);
    sparkGeo.scale(0.8, 1.6, 0.8);
    const sparkMesh1 = new THREE.Mesh(sparkGeo, starMaterial);
    sparkMesh1.position.set(1.7, 1.3, 0.5);
    catGroup.add(sparkMesh1);

    const sparkMesh2 = new THREE.Mesh(sparkGeo, starMaterial);
    sparkMesh2.scale.set(0.6, 0.6, 0.6);
    sparkMesh2.position.set(-1.6, -0.8, 0.8);
    catGroup.add(sparkMesh2);

    // Interactive Particles on Click
    const particleCount = 18;
    const particleGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const particleMat = new THREE.MeshBasicMaterial({ color: colors.pink });
    const particleGroup = new THREE.Group();
    catGroup.add(particleGroup);

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      p.visible = false;
      particleGroup.add(p);
      particles.push({
        mesh: p,
        vel: new THREE.Vector3(),
        life: 0,
      });
    }

    const triggerBurst = () => {
      particles.forEach((p) => {
        p.mesh.position.set(0, 0, 1.1);
        p.mesh.visible = true;
        p.life = 1.0;
        p.vel.set(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.2) * 0.09,
          (Math.random() - 0.2) * 0.08
        );
      });
    };

    // Mouse Tracking State
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isHovered = false;
    let jumpTime = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      // Normalize coordinates -1 to 1 based on window
      mouse.targetX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // Clamp targets for natural movement
      mouse.targetX = Math.max(-1.4, Math.min(1.4, mouse.targetX));
      mouse.targetY = Math.max(-1.2, Math.min(1.2, mouse.targetY));
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onMouseMove, { passive: true });

    container.addEventListener('mouseenter', () => { isHovered = true; });
    container.addEventListener('mouseleave', () => { isHovered = false; });

    // Click reaction
    const onClick = () => {
      jumpTime = 1.0;
      triggerBurst();
    };
    container.addEventListener('click', onClick);

    // Animation Loop
    let clock = new THREE.Clock();
    let twitchTimer = 0;
    let blinkTimer = 0;
    let isBlinking = false;

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth lerp mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Natural Breathing & Floating
      const breath = Math.sin(time * 2.2) * 0.05;
      const floatX = Math.cos(time * 1.5) * 0.03;
      catGroup.position.y = breath;
      catGroup.position.x = floatX;

      // Head Rotation towards cursor
      headGroup.rotation.y = mouse.x * 0.45;
      headGroup.rotation.x = -mouse.y * 0.35;
      headGroup.rotation.z = -mouse.x * 0.1;

      // Eye pupil tracking
      const pupilShiftX = mouse.x * 0.035;
      const pupilShiftY = mouse.y * 0.035;
      eyeLeftObj.pupil.position.x = pupilShiftX;
      eyeLeftObj.pupil.position.y = pupilShiftY;
      eyeRightObj.pupil.position.x = pupilShiftX;
      eyeRightObj.pupil.position.y = pupilShiftY;

      // Ear twitches
      twitchTimer += delta;
      if (twitchTimer > 3.5) {
        if (twitchTimer > 3.8) {
          twitchTimer = 0;
          earGroupLeft.rotation.z = 0.38;
          earGroupRight.rotation.z = -0.38;
        } else {
          earGroupLeft.rotation.z = 0.38 + Math.sin(time * 30) * 0.12;
          earGroupRight.rotation.z = -0.38 + Math.cos(time * 28) * 0.08;
        }
      }

      // Blinking
      blinkTimer += delta;
      if (blinkTimer > 4.2) {
        isBlinking = true;
        eyeLeftObj.group.scale.y = 0.1;
        eyeRightObj.group.scale.y = 0.1;
        if (blinkTimer > 4.35) {
          eyeLeftObj.group.scale.y = 1;
          eyeRightObj.group.scale.y = 1;
          isBlinking = false;
          blinkTimer = 0;
        }
      }

      // Whisker subtle wobble
      whiskers.forEach((w, i) => {
        w.mesh.rotation.z = w.baseRotZ + Math.sin(time * 4 + i) * 0.025;
      });

      // Sparkles spinning & floating
      sparkMesh1.rotation.y = time * 1.2;
      sparkMesh1.rotation.x = time * 0.8;
      sparkMesh1.position.y = 1.3 + Math.sin(time * 1.8) * 0.12;

      sparkMesh2.rotation.y = -time * 1.4;
      sparkMesh2.rotation.z = time * 0.9;
      sparkMesh2.position.y = -0.8 + Math.cos(time * 2.1) * 0.09;

      // Jump / Bounce Reaction
      if (jumpTime > 0) {
        jumpTime -= delta * 2.2;
        const jumpProgress = Math.max(0, jumpTime);
        const bounce = Math.sin((1 - jumpProgress) * Math.PI);
        catGroup.position.y += bounce * 0.4;
        catGroup.scale.set(1 + bounce * 0.08, 1 - bounce * 0.06, 1 + bounce * 0.08);
      } else {
        catGroup.scale.set(1, 1, 1);
      }

      // Animate Click Particles
      particles.forEach((p) => {
        if (p.mesh.visible) {
          p.mesh.position.add(p.vel);
          p.life -= delta * 1.5;
          p.mesh.scale.setScalar(Math.max(0, p.life));
          if (p.life <= 0) p.mesh.visible = false;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const onResize = () => {
      const newWidth = container.clientWidth || 380;
      const newHeight = container.clientHeight || 420;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);
  },
};
