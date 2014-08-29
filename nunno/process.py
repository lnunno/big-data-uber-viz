'''
Created on Aug 28, 2014

@author: lnunno
'''
import pandas as pd

def load_file():
    uber_file_path = '../uber_gps_tsv/all_header.tsv'
    df = pd.DataFrame.from_csv(uber_file_path, sep='\t')
    df['timestamp'] = pd.to_datetime(df['timestamp'],infer_datetime_format=True)

def main():
    load_file()
        
if __name__ == '__main__':
    main()
        