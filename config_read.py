from configupdater import ConfigUpdater
import ConfigParser

configParser = ConfigParser.RawConfigParser()
configFilePath = ' ' #put in file path
configParser.read(configFilePath)
configParser.set( )#opearation
with open("configFilePath", "w+") as configFile:
    ConfigParser.write(configFile)
configFile.close()

updater = ConfigUpdater()

