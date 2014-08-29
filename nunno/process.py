'''
Requires:

* python3
* pandas - pip3 install pandas

Created on Aug 28, 2014

@author: lnunno
'''
import pandas as pd

def filter_uber_df(df, day_filters=None):
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
    
def load_file(load_type=None, day_filters=None, nrows=None):
    '''
    @param load_type: Can be 'day' or 'night' or None.
    
    @param day_filters: [Int] the integer values of the days to INCLUDE. If
    None, all days are included. 0 = Monday,...,6 = Sunday.
    
    @param nrows: Int. Limit the number of rows loaded by this amount.
    
    @return: The resulting pandas DataFrame. 
    '''
    uber_file_path = '../uber_gps_tsv/all_header.tsv'
    df = pd.read_table(uber_file_path, sep='\t', nrows=nrows)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    filter_uber_df(df, day_filters)
    return df

def to_uber_json(df, save_path=None):
    return df.to_json(save_path)
    
def main():
    day_map = {"M":0,"T":1,"W":2,"R":3,"F":4,"S":5,"U":6}
    weekdays = list(range(0,5))
    weekends = list(range(5,7))
    df = load_file(nrows=1000)
    to_uber_json(df,'sample_all.json')
    weekday_df = filter_uber_df(df=df.copy(), day_filters=weekdays)
    to_uber_json(weekday_df, 'sample_weekday.json')
    weekend_df = filter_uber_df(df=df.copy(), day_filters=weekends)
    to_uber_json(weekend_df, 'sample_weekend.json')
        
if __name__ == '__main__':
    main()
        