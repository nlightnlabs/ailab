const data_type ={
  
}

export default class BaseObject {

    constructor({id, uuid, description, created, created_by, updated})
        {
            this.id = {name: "id", data_type: "number", }; 
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
    