const projects = require('../Models/projectSchema');
// const { findByIdAndDelete } = require('../Models/userSchema');

exports.addProject = async(req,res)=>{
    console.log("inside add project function");
    const {title,languages,github,websites,overview,userId} = req.body
    // console.log(req.file);
    projectImage = req.file.filename
    // console.log(`${title}, ${languages},${github},${websites},${overview},${projectImage},${userId}`);

    try{
        const existinguser = await projects.findOne({github})
        if(existinguser){
            res.status(406).json("Project already exist")
        }else{
            const newProject = new projects({
                title,
                languages,
                github,
                websites,
                overview,
                projectImage,
                userId
            })

            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch (err){
        res.status(401).json("Error Transaction Failed!!!...")
    }
}


// get all projects

exports.getAllUserProjects = async(req,res)=>{
    const userId = req.user
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(`Error !!! Transaction failed: ${err}`)
    }
}

// get home project before login
exports.gethomeprojects = async (req, res) => {
    try {
        const homeproject = await projects.find().limit(3);
        res.status(200).json(homeproject);
    } catch (err) {
        console.error(`Error in gethomeprojects: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// get home project after login all project

exports.getallhomeprojects = async(req,res)=>{
    const searchkey = req.query.search
    const query = {
        languages:{$regex:searchkey,$options:"i"}
    }
    try{
        const allhomeproject = await projects.find(query)
        res.status(200).json(allhomeproject)
    }catch (err){
        res.status(401).json(`Error !!! transaction failed ${err}`)
    }
}

// edit project
exports.editproject = async(req,res)=>{
    const userId = req.user 
    console.log("userId",userId); //userid
    const {title,languages,github,websites,overview,projectImage} = req.body
    const uploadedimage = req.file?req.file.filename:projectImage
    const {id} = req.params //project id
    console.log("req params: ",req.params);
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,languages,github,websites,overview,projectImage:uploadedimage,userId},{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
        
    }catch (err){
        res.status(401).json(`Error !!! transaction Faile ${err}`)
    }
}



// delete project 
exports.deleteproject = async (req,res)=>{
  const {id} = req.params
    try {
       const removedproject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removedproject)
    } catch (err) {
        res.status(401).json(`Error !!! transaction Faile ${err}`)
    }
}
