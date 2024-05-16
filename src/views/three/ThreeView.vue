<template>
  <div class="container" ref="container">

  </div>
</template>
<style scoped>
.container {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
<script lang="ts" setup>
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {onMounted, ref} from "vue";
import Stats from "three/examples/jsm/libs/stats.module";
import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {AnimationMixer, Group} from "three";
import {Text} from 'troika-three-text'

const container = ref();


class Character {
  mixer: AnimationMixer;
  model: Group;
  loader = new GLTFLoader();

  forces = {
    g: -0.06,
    ag: -0.06,
    fm: 1.0,
    fma: 0.009,
    fmr: 0.001,

    vx: 0.00,
    vxs: 0.006,
    vxr: 0.001,
    mvx: 0.07,

    vy: 0.00,
    vys: 0.03,
    vyr: 0.01,
    mvy: 0.07,
  };
  movement = [0, 0, 0, 0];
  debugModel: Text;

  constructor(scene: THREE.Scene) {
    this.debugModel = new Text();
    this.debugModel.color = "black";
    scene.add(this.debugModel);
    this.load(scene);


    window.addEventListener("keypress", (e) => {
      if (e.code == "KeyW" || e.code == "ArrowUp") {
        this.forces.fm = -.6;
      } else if (e.code == "KeyS" || e.code == "ArrowDown") {
        this.forces.fm = 3;
      }
    })
    window.addEventListener("keydown", (e) => {
      if (e.code == "KeyD" || e.code == "ArrowLeft") {
        this.movement[0] = 1;
      } else if (e.code == "KeyA" || e.code == "ArrowRight") {
        this.movement[1] = 1;
      }
      if (e.code == "KeyW" || e.code == "ArrowUp") {
        this.movement[2] = 1;
      } else if (e.code == "KeyS" || e.code == "ArrowDown") {
        this.movement[3] = 1;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.code == "KeyD" || e.code == "ArrowLeft") {
        this.movement[0] = 0;
      } else if (e.code == "KeyA" || e.code == "ArrowRight") {
        this.movement[1] = 0;
      }
      if (e.code == "KeyW" || e.code == "ArrowUp") {
        this.forces.ag = this.forces.g;
        this.movement[2] = 0;
      } else if (e.code == "KeyS" || e.code == "ArrowDown") {
        this.forces.ag = this.forces.g;
        this.movement[3] = 0;
      }
    });
  }

  load(scene: THREE.Scene) {
    this.loader.load("/public/model_file.glb", (gltf) => {
      this.model = gltf.scene;
      this.model.position.set(0, 3, 0);
      scene.add(this.model);

      this.mixer = new THREE.AnimationMixer(this.model);
    })
  }

  animate(delta) {

    if (this.movement[0]) {
      this.forces.vx = Math.min(this.forces.mvx, this.forces.vx + this.forces.vxs);
    } else if (this.movement[1]) {
      this.forces.vx = Math.max(-this.forces.mvx, this.forces.vx - this.forces.vxs);
    } else {
      if (this.forces.vx > 0) {
        this.forces.vx = Math.max(0, this.forces.vx - this.forces.vxr);
      } else if (this.forces.vx < 0) {
        this.forces.vx = Math.min(0, this.forces.vx + this.forces.vxr);
      }
    }

    if (this.movement[2]) {
      // this.forces.vy = Math.min(this.forces.mvy, this.forces.vy + this.forces.vys);
    } else if (this.movement[3]) {
      // this.forces.vy = Math.max(-this.forces.mvy, this.forces.vy - this.forces.vys);
    } else {
      // if (this.forces.vy > 0) {
      //   this.forces.vy = Math.max(0, this.forces.vy - this.forces.vyr);
      // } else if (this.forces.vy < 0) {
      //   this.forces.vy = Math.min(0, this.forces.vy + this.forces.vyr);
      // }
    }

    this.forces.vy = this.forces.ag * this.forces.fm


    if (this.model) {
      this.debugModel.position.x = this.model.position.x;
      this.debugModel.position.y = this.model.position.y - 0.35;
      this.debugModel.position.z = this.model.position.z;
      this.debugModel.text = `vx: ${this.forces.vx} \nvy: ${this.forces.vy} `;
      this.model.position.x += this.forces.vx;
      const toBy = this.model.position.y + this.forces.vy;
      if (toBy > -1) {
        this.forces.fm += this.forces.fma;
        this.model.position.y = toBy;
      } else {
        this.forces.fm = 1;
      }
    }
    if (this.mixer)
      this.mixer.update(delta)
  }
}

onMounted(() => {


  const clock = new THREE.Clock();

  const stats = new Stats();
  container.value.appendChild(stats.dom);

  const renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(innerWidth, innerHeight);
  container.value.appendChild(renderer.domElement);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfe3dd);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 1, 100);
  camera.position.set(0, 0, 8);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.update();
  controls.enablePan = true;
  controls.enableDamping = true;

  // const dracoLoader = new DRACOLoader();
  // dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

  const character = new Character(scene);

  const animate = () => {

    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    character.animate(delta);
    controls.update();
    stats.update();
    renderer.render(scene, camera);
  }
  animate();
})
</script>