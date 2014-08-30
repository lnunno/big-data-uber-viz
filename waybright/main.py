'''
Created on Aug 27, 2014



@author: daniel
'''


# Global Settings for Script
#path = "C:\\Users\\daniel\\Documents\\GitHub\\big-data-uber-viz\\uber_gps_tsv\\all.tsv"
path = "~/Software/GitHub/big-data-uber-viz/uber_gps_tsv/all.tsv"
animationInc = 20                       # Number of minutes forming an animation timestep
startDay = (6 * 60) / animationInc      # 6AM - When Day starts, in minutes
startNight = (18 * 60) / animationInc   # 6PM - When Night starts, in minutes 



#####
#       Helper Functions
#####

# Returns the Time in Minutes
def getTime(timestamp):
    x = timestamp.split("T")
    y = x[1].split("+")
    
    return ( ( int(y[0]) * 60 ) + int(y[1]) ) / int(20)
# End Function

# Returns a day code.  Note - 1 JAN 2007 was a Monday.
# Assumes that the early morning belongs to the night of the previous day.
def getDay(timestamp):
    # Collect raw day that this belongs to
    x = timestamp.split("T")
    day = x[0].split("-")
    
    # Collect how many minutes into day we are
    minutes = getTime(timestamp)
    
    if( day[2] == "01"):
        if( minutes < startDay ):
            return "Su"
        else:
            return "M"
    elif( day[2] == "02" ):
        if( minutes < startDay ):
            return "M"
        else:
            return "Tu"
    elif( day[2] == "03" ):
        if( minutes < startDay ):
            return "Tu"
        else:
            return "W"
    elif( day[2] == "04" ):
        if( minutes < startDay ):
            return "W"
        else:
            return "Th"
    elif( day[2] == "05" ):
        if( minutes < startDay ):
            return "Th"
        else:
            return "F"
    elif( day[2] == "06" ):
        if( minutes < startDay ):
            return "F"
        else:
            return "Sa"
    else:
        if( minutes < startDay ):
            return "Sa"
        else:
            return "Su"
# End Function



    
#####
#       Data Structures
#####
class UberPath:
    self.tripID = -1
    
    def __init__(self, day, animationStep, path = []):
        self.day = day
        self.animationStep = animationStep
    
    def _convertMinutes(self, timestamp):
        x = timestamp.split("T")
        y = x[1].split("+")
    
        return ( ( int(y[0]) * 60 ) + int(y[1]) ) / int(20)

    def _print(self):
        return "print me"


class DayList:
    
    
    def __init__(self):
        self.day = []
        self.night = []
    
#####
# Convert Raw Text File
#
# TripID, DayOfWeek, 
#     DataPoint ID/Time, Longitude, Latitude
#####

line = ""
values = []

with open(path, "r") as fd:
    for line in fd:
        line = line.rstrip()              # Strip \n and whitespace
        rawvalues = line.split("\t")      # Split on tab
        
        #print rawvalues[0] + "\t" + getDay(rawvalues[1]) + "\t" + getTime(rawvalues[1]) + "\t" + rawvalues[2] + "\t" + rawvalues[3]
        print "[ " + rawvalues[2] + ", " + rawvalues[3] + ", '" + int(rawvalues[0]).__str__() + "' ],"
        #values[1] = getDay(rawvalues[1])
        #print values
         
         