import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// Playing with position
// mesh.position.x = 1
// mesh.position.y=2
// mesh.position.z=-1
// mesh.position.set(0.7,0.1,-0.8)

// Playing with scale
// mesh.scale.x=2
// mesh.scale.y = 3
// mesh.scale.z=0.5

// Playing with rotation
// mesh.rotation.reorder("YXZ")
// mesh.rotation.y=1
// mesh.rotation.z=0.800
// mesh.rotation.x=0.5
// mesh.rotation.y = Math.PI

// scene.add(mesh)

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    )
cube2.position.y=2
group.add(cube2)

const axesHelper =new THREE.AxesHelper()
scene.add(axesHelper)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// camera.lookAt(new THREE.Vector3(mesh.position))

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)