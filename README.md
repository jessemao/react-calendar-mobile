# React Picker Mobile
React Picker Mobile is a component very easy to use with no extra effort. It can be used in any project with great performance!

# How to install
```
npm install react-picker-mb --save
```

# How to use
## ES6
```
import Picker from 'react-picker-mb';
```

## CommonJS
```
var Picker = require('react-picker-mb');
```

# Properties

| Name             | Type     | Default  | Description                                                                                                                                |
|------------------|----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| itemHeight       | Number   | 36       | Height of each row in picker (px).                                                                                                         |
| visibleItemCount | Number   | 5        | Count of visible items in picker.                                                                                                          |
| showToolbar      | Boolean  | false    | If true, a customized toolbar would appear in picker.                                                                                      |
| rotateEffect     | Boolean  | false    | If true, picker will be in 3D mode; otherwise, picker will be in 2D.                                                                       |
| pickerSlots      | Array    | []       | Array of pickers is used in total. Each item of this array will implement an individual picker(**pickerSlot**).                                |
| onChange         | Function | () => {} | This accepts a callback function for picker to output result. Picker result will be in format of array, for example, ['2015', '01', '02']. |

### PickerSlot
| Name           | Type    | Default  | Description                                                                                                                                                                                          |
|----------------|---------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options        | Array   | []       | Array of each picker's options. item of array can be one of type: String, Number, Boolean, Object. If it's an object, property **dataKey** then is required so that picker knows what values to use. |
| dataKey        | String  | ""       | Optional property, is required when options array includes objects. Use this key to get values of option object.                                                                                     |
| defaultIndex   | Number  | 0        | Set default value of picker by index.                                                                                                                                                                |
| divider        | Boolean | false    | If true, a divider column is created.                                                                                                                                                                |
| dividerContent | String  | "-"      | If **divider** is true, **dividerContent** will be used for displaying the divider column. It can be rich HTML string.                                                                               |
| className      | String  | ""       | Customized class for the picker column.                                                                                                                                                              |
| flex           | Number  | 0        | Optional property. Picker columns apply flex layout. Bigger value will result in a larger column.                                                                                                    |
| textAlign      | String  | 'center' | Can be 'left/center/right'. Text alignment of the picker column.                                                                                                                                     |

# Getting Started
To play it yourself, you can clone this repo and run the example in your local space.

Or you can play with the picker [**Online here**](https://jessemao.github.io/react-picker-mobile/)
```
git clone https://github.com/jessemao/react-picker-mobile.git
cd react-picker-mobile && cd example
npm install
npm start
```
The code example as below:
```
import React from 'react';
import ReactDOM from 'react-dom';
import Picker from 'react-picker-mb';
import './index.css';

ReactDOM.render(<Picker
    pickerSlots={[{
      flex: 1,
      options: [{
        id: '0'
      }, {
        id: '1'
      }, {
        id: '2'
      }, {
        id: '3'
      }, {
        id: '4'
      }],
      defaultIndex: 2,
      dataKey: 'id',
      className: 'slot1',
      textAlign: 'right',
    }, {
      divider: true,
      dividerContent: '-',
      className: 'slot2'
    }, {
      flex: 1,
      options: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
      className: 'slot3',
      textAlign: 'left'
    }]
  }
  visibleItemCount={ 5 }
  onChange={ (res) => console.log(res) }
/ >,
document.getElementById('root')
);
```

# License
MIT