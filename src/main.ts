import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg')!,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
	color: 0xff6347,
});

const capsule = new THREE.Mesh(geometry, material);

scene.add(capsule);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 1, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
	const geometry = new THREE.TetrahedronGeometry(0.25, 0);
	const material = new THREE.MeshStandardMaterial({ color: 0xedede9 });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill([])
		.map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill([]).forEach(addStar);

const boxTexture = new THREE.TextureLoader().load('earth2.jpg');

const box = new THREE.Mesh(
	new THREE.SphereGeometry(5, 32, 16),
	new THREE.MeshBasicMaterial({ map: boxTexture })
);

scene.add(box);

function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	// const prevT = t
	box.rotation.x += 0.05;
	box.rotation.y += 0.075;
	box.rotation.z += 0.05;

	camera.position.z = 30 + t * 0.01;

	console.log(camera.position.z, t);
	// camera.position.x = t * -0.0002;
	// camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;

function animate() {
	requestAnimationFrame(animate);
	capsule.rotation.x += 0.005;
	capsule.rotation.y += 0.01;
	capsule.rotation.z += 0.002;

	controls.update();
	renderer.render(scene, camera);
}

animate();
