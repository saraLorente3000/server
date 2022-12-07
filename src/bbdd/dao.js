const sqlite3 = require('sqlite3')

class DAO {

  constructor() {
    //If the database does not exist, I create it and connect to it
    this.db = new sqlite3.Database('./suscriptions.db', (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
    //If the subscription table does not exist, I create it
    this.db.run("CREATE TABLE IF NOT EXISTS suscription(id INTEGER PRIMARY KEY AUTOINCREMENT, birth STRING, newsletter STRING, email STRING, gender STRING, name STRING)")
  }


   insertSubscription(name, email, birth, newsletter, gender) {
      //I create a constant for the connection to the database
      const db = this.db
      //I return a promise so I can wait for the result of the insert
      return new Promise(function(resolve,reject){
        //I do the insert into the database
        db.run(`INSERT INTO suscription (name, email, birth, newsletter, gender) VALUES('${name}', '${email}', '${birth}', '${newsletter}', '${gender}')`, function(err,rows){
          if(err){return reject(err);}
          resolve(this.lastID);
        });
    });
  }

  async getUserId(email, newsletter){
    //I create a constant for the connection to the database
    const db = this.db
    //I return a promise so I can wait for the result of the select
    return new Promise(function(resolve,reject){
      //I get the email / newsletter identifier
      db.all(`SELECT ID FROM suscription where email ='${email}'  and  newsletter ='${newsletter}'`, function(err,rows){
         if(err){return reject(err);}
         resolve(rows);
       });
  });
  }

  async getNewsletters(email){
    //I create a constant for the connection to the database
    const db = this.db
     //I return a promise so I can wait for the result of the select
    return new Promise(function(resolve,reject){
      //I get the newsletters for a given email
      db.all(`SELECT newsletter FROM suscription where email ='${email}'`, function(err,rows){
         if(err){return reject(err);}
         resolve(rows);
       });
  });
  }

  async getDetails(email, newsletter){
    //I create a constant for the connection to the database
    const db = this.db
    //I return a promise so I can wait for the result of the select
    return new Promise(function(resolve,reject){
      //I get the details for a given email/newsletters
      db.all(`SELECT * FROM suscription where email ='${email}' and  newsletter ='${newsletter}'`, function(err,rows){
         if(err){return reject(err);}
         resolve(rows);
       });
  });
  }

  async deleteNewsletters(email, newsletter){
    //I create a constant for the connection to the database
    const db = this.db
    //I return a promise so I can wait for the result of the delete
    return new Promise(function(resolve,reject){
      //I delete a given email/newsletters
      db.run(`DELETE  FROM suscription where email ='${email}' AND newsletter='${newsletter}'`, function(err,rows){
         if(err){return reject(err);}
         resolve(rows);
       });
  });
  }
 
}

module.exports = DAO