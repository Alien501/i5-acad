
const db = require('../db')


module.exports.getAllBlogs = async () => {
    const [rows] = await db.query("SELECT POST_TITLE, POST_THUMB, POST_ID, POST_CAT FROM BLOGS ORDER BY POST_CREATED DESC")
    return rows
}

module.exports.getBlogById = async (id) => {
    const [rows] = await db.query("SELECT * FROM BLOGS WHERE POST_ID = ?", [id])
    return rows
}

module.exports.deleteById = async (id) => {
    const [{affectedRows}] = await db.query("DELETE FROM BLOGS WHERE POST_ID = ?", [id])
    return affectedRows
}

module.exports.addOrEditBlog = async (obj, id=0) => {
    let {POST_CONTENT} = obj;
    if(POST_CONTENT.includes('"')){
        POST_CONTENT.replace(/"/g, "\"")
        console.log(POST_CONTENT);
    }
    const [[affectedRows]] = await db.query(`CALL usp_blogs_add_or_edit(${id}, '${obj.POST_TITLE}', '${POST_CONTENT}', '${obj.POST_THUMB}', '${obj.POST_CAT}')`, [id, obj.POST_TITLE, POST_CONTENT, obj.POST_THUMB, obj.POST_CAT])
    return affectedRows[0]
}

module.exports.addCat = async (obj) => {
    const query = `INSERT INTO CAT VALUES('${obj.cat}')`
    const [rows] = await db.query(query)
    return rows
}

module.exports.getCat = async () => {
    const [rows] = await db.query('SELECT * FROM CAT');
    console.log('Running');
    return rows
}

module.exports.delCat = async (name) => {
    const [rows] = await db.query('DELETE FROM CAT WHERE CAT_NAME = ?', [name])
}

module.exports.getByClass = async (className) => {
    const [rows] = await db.query('SELECT * FROM BLOGS WHERE POST_CAT = ?', [className])
    return rows
}