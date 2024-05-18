export default class TextField {

    constructor({max_length, })
        {
            this.max_length = 200
            this.uuid = uuid || null;
            this.description = description || "";
            this.created = created || new Date();
            this.created_by = created_by || "system";
            this.updated = updated || new Date();
        };

    info() {
      let properties = []
      Object.entries(this).forEach(([key,value])=>{
        properties.push({[key]:value})
      })
      console.log(properties);
      return properties; 
    }
}