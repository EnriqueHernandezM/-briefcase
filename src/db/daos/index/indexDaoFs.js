import ContainerIndexFs from "../../fileSystem/index.js";

export default class IndexDaoFs extends ContainerIndexFs {
  constructor() {
    super("dataRouts.json");
  }
}
