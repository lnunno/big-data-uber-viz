'''
Created on Aug 27, 2014



@author: daniel
'''


# Global Settings for Script
path = "C:\\Users\\daniel\\Documents\\GitHub\\big-data-uber-viz\\uber_gps_tsv\\all.tsv"
startDay = "080000"
startNight = "200000"


# Returns the Day in text
def getDay(timestamp):
    x = timestamp.split("T")
    y = x[0].split("-")
    
    if( y[2] == "01" ):
        return "M"
    elif( y[2] == "02" ):
        return "Tu"
    elif( y[2] == "03" ):
        return "W"
    elif( y[2] == "04" ):
        return "Th"
    elif( y[2] == "05" ):
        return "F"
    elif( y[2] == "06" ):
        return "Sa"
    else:
        return "Su"

# Returns the Time in HHMMSS
def getTime(timestamp):
    x = timestamp.split("T")
    y = x[1].split("+")
    
    return y[0].replace(":", "")
    

# End JSON Result
#
# TripID, DayOfWeek, 
#     DataPoint ID/Time, Longitude, Latitude

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
         
         