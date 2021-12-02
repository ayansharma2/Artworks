import SQLite from 'react-native-sqlite-storage'

export default class LocalStorage{
    static isDatbaseAccessed = false;
    static artId = []
    static arts = []
    static db 
    static async initDatabase () {
        
        const db = await SQLite.openDatabase(
            {
                name:'db1.db'
            },()=>{
                this.db = db
                this.createTable()
            },
            (error)=>{console.log(error.message)})
        
    }

    static async createTable(){
        await this.db.transaction( async(ts)=>{
            await ts.executeSql('CREATE TABLE IF NOT EXISTS Arts(id int NOT NULL PRIMARY KEY,artist_display varchar NOT NULL,dimensions varchar NOT NULL,credit_line varchar NOT NULL,title varchar NOT NULL,artist_title varchar NOT NULL,image_id varchar NOT NULL);')
            await ts.executeSql(
                'SELECT * FROM Arts',
                [],
                (tx,results)=>{
                    var rows = results.rows
                    this.arts = []
                    this.artId = []
                    for (let i = 0; i < rows.length; i++) {
                        var item = rows.item(i);
                        this.arts.push(item)
                        this.artId.add(item.id)
                    }
                    console.log(this.artId)
                }
            )
        })
        
    }

    static async getSavedArtItems(){
        await this.db.transaction((tx)=>{
            tx.executeSql(
                'SELECT * FROM Arts',
                [],
                (tx,results)=>{
                    var rows = results.rows
                    this.arts = []
                    this.artId = []
                    for (let i = 0; i < rows.length; i++) {
                        var item = rows.item(i);
                        this.arts.push(item)
                        this.artId.push(item.id)
                    }
                    
                }
            )
        })
    
    }


    static insertIntoDatabase({art}){

        if(this.arts.indexOf(art) === -1){
            this.db.transaction(async (tx)=>{
                await tx.executeSql(
                    "INSERT INTO Arts VALUES ('"+art.id+"','"+art.artist_display +"','"+art.dimensions+"','"+art.credit_line +"','"+art.title +"','"+art.artist_title +"','"+art.image_id +"');"
                )
                this.arts.push(art)
                this.artId.push(art.id)
            })
        }
    }

}