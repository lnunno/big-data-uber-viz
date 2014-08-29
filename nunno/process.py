'''
Requires:

* python3
* pandas - pip3 install pandas

Created on Aug 28, 2014

@author: lnunno
'''
import pandas as pd

def load_file(load_type=None, day_filters=None, nrows=None):
    '''
    @param load_type: Can be 'day' or 'night' or None.
    
    @param day_filters: [Int] the integer values of the days to INCLUDE. If
    None, all days are included.
    
    @param nrows: Int. Limit the number of rows loaded by this amount.
    
    @return: The resulting pandas DataFrame. 
    '''
    uber_file_path = '../uber_gps_tsv/all_header.tsv'
    df = pd.read_table(uber_file_path, sep='\t', nrows=nrows)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    day_of_week_index = pd.Index(df['timestamp']).dayofweek
    if day_filters:
        # Filter by the day(s) of the week.
        def filter_by_day_of_week(days, day_ls):
            ls = []
            for x in days:
                if x in day_ls:
                    ls.append(True)
                else:
                    ls.append(False)
            return ls
        df = df[filter_by_day_of_week(day_of_week_index, day_filters)]
    return df

def main():
    day_map = {"M":0,"T":1,"W":2,"R":3,"F":4,"S",5,"U":6}
    df = load_file(nrows=1000, day_filters=[1])
        
if __name__ == '__main__':
    main()
        