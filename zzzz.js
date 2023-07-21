import fs from "fs";

/*function x(idRec) {
  const datosUserPrueba = fs.readFileSync("dataAdmin.json", "utf8");
  const routs = datosUserPrueba ? JSON.parse(datosUserPrueba) : [];
  for (const el of routs) {
    if (el.id == idRec) {
      return routs;
    } else {
      return err;
    }
  }
}
let m = x(1);
console.log(m);
 */

function createUser(newUser, func) {
  let allAddresExisting = [];
  let id = 1;
  if (id == 1) {
    let s = new Error("iiu");
    func(s, null);
  }
  newUser.id = id;
  allAddresExisting.push(newUser);
  const newRout = JSON.stringify(allAddresExisting);
  // fs.writeFileSync("dataAdmin.json", newRout);
  func(null, allAddresExisting);
}

createUser({ NOMBRE: "PEPE" }, (err, usercONid) => {
  if (err) {
    console.log(err);
    return err;
  }
  if (usercONid) {
    return usercONid;
  }
});
