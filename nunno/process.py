'''
Requires:

* python3
* pandas - pip3 install pandas

Created on Aug 28, 2014

@author: lnunno
'''
import json
import pandas as pd
import os

data_dir = 'json/'

def filter_uber_df(df, time_of_day=None, day_filters=None, night_begin_hour=17, morning_begin_hour=5):
    '''
    Filter the uber dataset with the given parameters.
    
    @param df: DataFrame. An Uber dataframe.
    
    @param time_of_day: Can be 'day' or 'night' or None.
    
    @param day_filters: [Int] the integer values of the days to INCLUDE. If
    None, all days are included. 0 = Monday,...,6 = Sunday.
    
    @param night_begin_hour: The hour where night starts. Default is 5pm (17:00).
    
    @param morning_begin_hour: The hour where night starts. Default is 5am (05:00).
    
    @see: load_file 
    '''
    day_of_week_index = pd.Index(df['timestamp']).dayofweek
    if day_filters:
        # Filter by the day(s) of the week first, since it trims dataset faster.
        def filter_by_day_of_week(days, day_ls):
            ls = []
            for x in days:
                if x in day_ls:
                    ls.append(True)
                else:
                    ls.append(False)
            return ls
        df = df[filter_by_day_of_week(day_of_week_index, day_filters)]
    if time_of_day:
        def filter_by_time_of_day(days, tod):
            ls = []
            for x in days:
                hour = x.hour
                is_night = (hour > (night_begin_hour-1)) or (hour < morning_begin_hour)
                if tod == 'night' and is_night:
                    # It is night.
                    ls.append(True)
                elif tod == 'day' and (not is_night):
                    # It is day.
                    ls.append(True)
                else:
                    ls.append(False)
            return ls
        df = df[filter_by_time_of_day(df['timestamp'], time_of_day)]
    return df
    
def load_file(time_of_day=None, day_filters=None, nrows=None, night_begin_hour=17, morning_begin_hour=5):
    '''
    @param time_of_day: Can be 'day' or 'night' or None.
    
    @param day_filters: [Int] the integer values of the days to INCLUDE. If
    None, all days are included. 0 = Monday,...,6 = Sunday.
    
    @param nrows: Int. Limit the number of rows loaded by this amount.
    
    @param night_begin_hour: The hour where night starts. Default is 5pm (17:00).
    
    @param morning_begin_hour: The hour where night starts. Default is 5am (05:00).
    
    @return: The resulting pandas DataFrame. 
    '''
    uber_file_path = '../uber_gps_tsv/all_header.tsv'
    df = pd.read_table(uber_file_path, sep='\t', nrows=nrows)
    df['timestamp'] = pd.to_datetime(df['timestamp'], infer_datetime_format=True)
    
    # Convert all the times to US/Pacific.
    df['timestamp'] = df['timestamp'].apply(lambda x: x.tz_localize('UTC').tz_convert('US/Pacific'))
     
    filter_uber_df(df, time_of_day=time_of_day, 
                   day_filters=day_filters, night_begin_hour=night_begin_hour, 
                   morning_begin_hour=morning_begin_hour) 
    return df

class PandasEncoder(json.JSONEncoder):
    
    def default(self, o):
        if isinstance(o, pd.Timestamp):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)

def to_uber_json(df, save_file_name=None):
    groups = df.groupby('tripid')
    trip_dict = {}
    for (index, idf) in groups:
        idf = idf[['timestamp','lat','long']] # Only use these columns.
        trip_dict[str(index)] = idf.values.tolist()
    if save_file_name:
        save_path = os.path.join(data_dir,save_file_name)
        with open(save_path, 'w') as f:
            json.dump(trip_dict, f, cls=PandasEncoder)
    else:
        return json.dumps(trip_dict, cls=PandasEncoder)

def generate_samples():
    weekdays = list(range(0,5))
    weekends = list(range(5,7))
    df = load_file(nrows=1000)
    to_uber_json(df,'sample_all.json')
    night_df = filter_uber_df(df=df.copy(), time_of_day='night')
    to_uber_json(night_df, 'sample_night.json')
    day_df = filter_uber_df(df=df.copy(), time_of_day='day')
    to_uber_json(day_df, 'sample_day.json')
    weekday_df = filter_uber_df(df=df.copy(), day_filters=weekdays)
    to_uber_json(weekday_df, 'sample_weekday.json')
    weekend_df = filter_uber_df(df=df.copy(), day_filters=weekends)
    to_uber_json(weekend_df, 'sample_weekend.json')

def generate_real_data():
    day_dict = {
                "0":"monday",
                "1":"tuesday",
                "2":"wednesday",
                "3":"thursday",
                "4":"friday",
                "5":"saturday",
                "6":"sunday"
                }
    weekdays = list(range(0,5))
    weekends = list(range(5,7))
    print('Loading frame for all...')
    df = load_file()
    print('Generating all json...')
    to_uber_json(df,'all.json')
    
    print('Loading night frame...')
    night_df = filter_uber_df(df=df.copy(), time_of_day='night')
    print('Generating night json...')
    to_uber_json(night_df, 'night.json')
    
    print('Loading day frame...')
    day_df = filter_uber_df(df=df.copy(), time_of_day='day')
    print('Generating day json...')
    to_uber_json(day_df, 'day.json')
    
    print('Loading weekday frame...')
    weekday_df = filter_uber_df(df=df.copy(), day_filters=weekdays)
    print('Generating weekday json...')
    to_uber_json(weekday_df, 'weekday.json')
    
    print('Generating weekday day...')
    weekday_day_df = filter_uber_df(df=weekday_df.copy(), time_of_day='day')
    to_uber_json(weekday_day_df, 'weekday_day.json')
    
    print('Generating weekday night...')
    weekday_night_df = filter_uber_df(df=weekday_df.copy(), time_of_day='night')
    to_uber_json(weekday_night_df, 'weekday_night.json')
    
    print('Loading weekend frame...')
    weekend_df = filter_uber_df(df=df.copy(), day_filters=weekends)
    print('Generating weekend json...')
    to_uber_json(weekend_df, 'weekend.json')
    
    print('Generating weekend day...')
    weekend_day_df = filter_uber_df(df=weekend_df.copy(), time_of_day='day')
    to_uber_json(weekend_day_df, 'weekend_day.json')
    
    print('Generating weekend night...')
    weekend_night_df = filter_uber_df(df=weekend_df.copy(), time_of_day='night')
    to_uber_json(weekend_night_df, 'weekend_night.json')
    
    for (day_num_str,day_str) in day_dict.items():
        day_num = int(day_num_str)
        dow_df = filter_uber_df(df=df.copy(), day_filters=[day_num])
        
        print('Generating %s all...' % (day_str))
        to_uber_json(dow_df, '%s.json' % (day_str))
        
        print('Generating %s day...' % (day_str))
        day_df = filter_uber_df(df=dow_df.copy(), time_of_day='day')
        to_uber_json(day_df, '%s_day.json' % (day_str))
        
        print('Generating %s night...' % (day_str))
        night_df = filter_uber_df(df=dow_df.copy(), time_of_day='night')
        to_uber_json(night_df, '%s_night.json' % (day_str))
    
    print('Done with all.')
    
def main(debug=False):
    if debug:
        print('Running in DEBUG mode.')
        generate_samples()
    else:
        print('Running in STANDARD mode.')
        generate_real_data()
        
if __name__ == '__main__':
    main(debug=False)
        