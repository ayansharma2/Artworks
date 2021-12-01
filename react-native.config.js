module.exports = {
 project: {
        ios:{},
        android:{}
    },
    assets:['./assets/fonts/'],
  dependencies: {
    "react-native-sqlite-storage": {
      platforms: {
        android: {
          sourceDir:
            "../node_modules/react-native-sqlite-storage/platforms/android",
          packageImportPath: "import org.pgsqlite.SQLitePluginPackage;",
          packageInstance: "new SQLitePluginPackage()"
        }
      }
    }

  }

};