import Files from '../models/Files';

class FilesController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const files = await Files.create({
      name,
      path,
    });

    return res.json(files);
  }
}

export default new FilesController();
