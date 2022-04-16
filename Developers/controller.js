// Require file system
const fs = require("fs");

// Path
const path = require("path");

// Join
const filePath = path.join(process.cwd(), "data/developers.json");

// Read the file
let developers = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Get all developers
exports.getAllDevelopers = (req, res, next) => {
  res.status(200).json({
    result: Object.keys(developers).length,
    status: "SUCCESS",
    message: "Found all developers",
    data: {
      developers,
    },
  });
};

// Get developer by id
exports.getDeveloperById = (req, res, next) => {
  developer = developers.filter((el) => el.id == req.params.id);
  if (Object.keys(developer).length == 0)
    res.status(400).json({ status: "Error", message: "No Devloper Found" });

  res.status(200).json({
    status: "SUCCESS",
    data: {
      developer,
    },
  });
};

// Validate if id and name are not null
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.id) {
    return res
      .status(400)
      .json({ status: "Error", message: "Null value not allowed" });
  }
  next();
};

// Add developer
exports.createDeveloper = (req, res, next) => {
  const newDeveloper = req.body;
  console.log(`Name: and ID: ${newDeveloper}`);

  developers.push(newDeveloper); // Push the new developer data.
  fs.writeFileSync(filePath, JSON.stringify(developers)); // Stringify and overwrite the file
  res.status(200).json({
    status: "SUCCESS",
    message: "Developer added successfully",
    data: {
      developers,
    },
  });
};

// Edit developer data
exports.editDeveloperData = (req, res) => {
  const { name } = req.body;
  const developer = developers.filter((el) => el.id == req.params.id);
  developer[0].name = name;
  developers.indexOf(developer[0].id);
  fs.writeFileSync(filePath, JSON.stringify(developers));
  res.status(200).json({
    message: "Updated successfully",
    data: {
      developers,
    },
  });
};

// Delete developer
exports.deleteDeveloper = (req, res) => {
  const developer = developers.filter((el) => el.id == req.params.id); // Find developer
  if (!developer[0]) {
    return res.status(404).json({ message: "No developer found" });
  }
  developers.splice(developers.indexOf(developer[0]), 1); // Delete developer
  fs.writeFileSync(filePath, JSON.stringify(developers)); // Overwrite original json data
  res.status(200).json({
    message: "Developer deleted successfully.",
    data: {
      developers,
    },
  });
};
