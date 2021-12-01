import SQLite from 'react-native-sqlite-storage'

export default class LocalStorage{
    static isDatbaseAccessed = false;
    static artId = []
    static arts = []
    static db = null
    static initDatabase(){
        
        db = SQLite.openDatabase(
            {
                name:'arts.db'
            },()=>{console.log("Database Initialised")},
            (error)=>{console.log(error.message)})

        db.transaction((tx)=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS Arts( id int PRIMARY KEY, artist_display varchar(255), dimensions varchar(255), credit_line varchar(255), PRIMARY KEY(id))')
        })
        
    }

    static async getSavedArtItems(){
        console.log('GetItemsCalled')
        this.db.transaction((tx)=>{
            tx.executeSql(
                'SELECT * FROM Arts',
                [],
                (tx,results)=>{
                    console.log(results)
                }
            )
        })
    
    }


    static insertIntoDatabase({art}){
        db.transaction(async (tx)=>{
            await tx.executeSql(
                "INSERT INTO Arts VALUES ("+art.id+","+art.artist_display+","+art.dimensions+","+art.credit_line+");"
            )
            this.arts.push(art)
            this.artId.push(art.id)
        })
    }

}