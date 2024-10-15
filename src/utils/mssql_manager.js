import mssql from 'mssql';
import config from '../config/mssql.js';
import CustomError from './error.js';
import MyLogger from './my_logger.js'; 

let _poolMap = new Map();

class MicrosoftSQL {
    constructor() {
        MyLogger.info('constructor called', 'MicrosoftSQL');
        this.retryDelay = 1000;
    }

    async GetPool(poolName = 'default',retries = 3) {
        try {
            MyLogger.info('GetPool called', 'MicrosoftSQL');
            let attempts = 0;
            //
            while (attempts < retries) {
                try {
                    //
                    let pool = _poolMap.get(poolName);
                    //
                    if (!pool || !pool.connected) {
                        MyLogger.info('Creating new pool', 'MicrosoftSQL');
                        //
                        pool = new mssql.ConnectionPool(config);
                        //
                        pool.on('error', err => {
                            MyLogger.error('Pool error', 'MicrosoftSQL', err);
                            _poolMap.delete(poolName);
                        });
                        //
                        await pool.connect();
                        //
                        _poolMap.set(poolName, pool);
                        //
                        MyLogger.info('Pool created', 'MicrosoftSQL');
                        //
                    } 
                    //   
                    return pool;
                    //
                } catch (error) {
                    attempts++;
                    //
                    MyLogger.error('GetPool error', 'MicrosoftSQL' ,{attempts: attempts, error: error,});
                    //
                    if (attempts < retries) {
                        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                    }
                    //
                    await this.delay(this.retryDelay);
                    //
                }   
                // End of try-catch block
            }
            // End of while loop
            
        } catch (error) {
            throw new CustomError('GetPool error', 500, 'MicrosoftSQL', {error: error,});
        }
    }

    async ClosePool(poolName = 'default') {
        try {
            MyLogger.info('ClosePool called', 'MicrosoftSQL');
            //
            let pool = _poolMap.get(poolName);
            //
            if (pool) {
                await pool.close();
                _poolMap.delete(poolName);
                MyLogger.info('Pool closed'+poolName, 'MicrosoftSQL');
            }else{
                MyLogger.warn('Pool not found:'+poolName, 'MicrosoftSQL');
            }
        } catch (error) {
            MyLogger.error('ClosePool error', 'MicrosoftSQL', {error: error,});
            throw new CustomError('ClosePool error', 500, 'MicrosoftSQL', {error: error,});
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // SQL Data Types
    // Expanded SQL Type Mapping for better readability and maintainability
    get SqlTypes() {
        return {
            Int: mssql.Int,                     // Integer
            BigInt: mssql.BigInt,               // Big Integer
            Bit: mssql.Bit,                     // Boolean
            Decimal: mssql.Decimal,             // Decimal value
            Float: mssql.Float,                 // Floating-point number
            Real: mssql.Real,                   // Real number
            Money: mssql.Money,                 // Money type
            SmallMoney: mssql.SmallMoney,       // Small Money type
            Numeric: mssql.Numeric,             // Numeric value
            VarChar: mssql.VarChar,             // Variable length character string
            NVarChar: mssql.NVarChar,           // Unicode variable length string
            Char: mssql.Char,                   // Fixed length character string
            NChar: mssql.NChar,                 // Fixed length Unicode string
            Text: mssql.Text,                   // Text data
            NText: mssql.NText,                 // Unicode text data
            UniqueIdentifier: mssql.UniqueIdentifier, // GUID
            Binary: mssql.Binary,               // Binary data
            VarBinary: mssql.VarBinary,         // Variable length binary data
            Image: mssql.Image,                 // Image data type (deprecated in newer versions of SQL)
            Xml: mssql.Xml,                     // XML data type
            Date: mssql.Date,                   // Date only
            DateTime: mssql.DateTime,           // Date and time
            DateTime2: mssql.DateTime2,         // More precise DateTime
            SmallDateTime: mssql.SmallDateTime, // Smaller range DateTime
            Time: mssql.Time,                   // Time only
            DateTimeOffset: mssql.DateTimeOffset, // DateTime with time zone
            SmallInt: mssql.SmallInt,           // Small integer
            TinyInt: mssql.TinyInt,             // Tiny integer (1 byte)
        };
    }
}

export default MicrosoftSQL;