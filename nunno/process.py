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
    return df

def main():
    df = load_file(nrows=1000)
        
if __name__ == '__main__':
    main()
        