document.addEventListener("DOMContentLoaded", function() {

  var cont = document.getElementById('cont');
  var renderer = new THREE.WebGLRenderer ({antialias: true});
  renderer.setSize(cont.clientWidth, cont.clientHeight);
  cont.appendChild(renderer.domElement);
  renderer.setClearColorHex(0x000000, 0);
  renderer.clear();
  
  // CAMERA: field of view (angle), aspect ratio, near, far
  var aspect = cont.clientWidth / cont.clientHeight
  var camera = new THREE.PerspectiveCamera(35, aspect, 1, 3000);
  camera.position.z = 300;
  var scene = new THREE.Scene();
  
  var geo = new THREE.CubeGeometry(90, 90, 90, 100, 100, 100); 
  
  var mat = new THREE.MeshBasicMaterial({color: 0x0FF00, wireframe: true});
  
  var cube = new THREE.Mesh(geo, mat);
  scene.add(cube);
  
  var light1 = new THREE.DirectionalLight(0xffffff, 0.6); // color, intens.
  light1.position.set(-1, -1, 0.3); // SW directional light
  var light2 = new THREE.PointLight(0xffffff, 0.6); // color, intens.
  light2.position.set(200, 200, 300); // NE point light
  var light3 = new THREE.DirectionalLight(0xffffff, 0.5); // color, intens.
  light3.position.set(0, 0, 1); // frontal light
  scene.add(light1); scene.add(light2); scene.add(light3); // add them all
  
  // ANIMATION LOOP
  function animate(t) {
    cube.rotation.x = t/2000;
    cube.rotation.y = t/2000;
    cube.rotation.z = t/2000;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
});