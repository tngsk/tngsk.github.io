"use strict";
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};
let templateParameters = [
    {
        'item1': '77',
        'item2': '82',
        'item3': '92',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '92',
        'max_index': '3',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-0.png'
    },
    {
        'item1': '77',
        'item2': '82',
        'item3': '92',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '92',
        'max_index': '3',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-0.png'
    },
    {
        'item1': '37',
        'item2': '32',
        'item3': '40',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '40',
        'max_index': '3',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-1.png'
    },
    {
        'item1': '37',
        'item2': '32',
        'item3': '40',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '40',
        'max_index': '3',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-1.png'
    },
    {
        'item1': '45',
        'item2': '39',
        'item3': '30',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '45',
        'max_index': '1',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-2.png'
    },
    {
        'item1': '45',
        'item2': '39',
        'item3': '30',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '45',
        'max_index': '1',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-2.png'
    },
    {
        'item1': '82',
        'item2': '76',
        'item3': '87',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '87',
        'max_index': '3',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-3.png'
    },
    {
        'item1': '82',
        'item2': '76',
        'item3': '87',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '87',
        'max_index': '3',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-3.png'
    },
    {
        'item1': '53',
        'item2': '61',
        'item3': '54',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '61',
        'max_index': '2',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-4.png'
    },
    {
        'item1': '53',
        'item2': '61',
        'item3': '54',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '61',
        'max_index': '2',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-4.png'
    },
    {
        'item1': '42',
        'item2': '41',
        'item3': '45',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '45',
        'max_index': '3',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-5.png'
    },
    {
        'item1': '42',
        'item2': '41',
        'item3': '45',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '45',
        'max_index': '3',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-5.png'
    },
    {
        'item1': '56',
        'item2': '63',
        'item3': '64',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '64',
        'max_index': '3',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-6.png'
    },
    {
        'item1': '56',
        'item2': '63',
        'item3': '64',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '64',
        'max_index': '3',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-6.png'
    },
    {
        'item1': '83',
        'item2': '94',
        'item3': '91',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '94',
        'max_index': '2',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-7.png'
    },
    {
        'item1': '83',
        'item2': '94',
        'item3': '91',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '94',
        'max_index': '2',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-7.png'
    },
    {
        'item1': '12',
        'item2': '18',
        'item3': '15',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '18',
        'max_index': '2',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-8.png'
    },
    {
        'item1': '12',
        'item2': '18',
        'item3': '15',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '18',
        'max_index': '2',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-8.png'
    },
    {
        'item1': '59',
        'item2': '53',
        'item3': '50',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '59',
        'max_index': '1',
        'graphFlag': '1',
        'size': '3',
        'img': 'graph-3-9.png'
    },
    {
        'item1': '59',
        'item2': '53',
        'item3': '50',
        'item4': '0',
        'item5': '0',
        'item6': '0',
        'item7': '0',
        'max': '59',
        'max_index': '1',
        'graphFlag': '0',
        'size': '3',
        'img': 'number-3-9.png'
    },
    {
        'item1': '21',
        'item2': '35',
        'item3': '25',
        'item4': '32',
        'item5': '33',
        'item6': '0',
        'item7': '0',
        'max': '35',
        'max_index': '2',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-0.png'
    },
    {
        'item1': '21',
        'item2': '35',
        'item3': '25',
        'item4': '32',
        'item5': '33',
        'item6': '0',
        'item7': '0',
        'max': '35',
        'max_index': '2',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-0.png'
    },
    {
        'item1': '76',
        'item2': '84',
        'item3': '73',
        'item4': '85',
        'item5': '70',
        'item6': '0',
        'item7': '0',
        'max': '85',
        'max_index': '4',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-1.png'
    },
    {
        'item1': '76',
        'item2': '84',
        'item3': '73',
        'item4': '85',
        'item5': '70',
        'item6': '0',
        'item7': '0',
        'max': '85',
        'max_index': '4',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-1.png'
    },
    {
        'item1': '63',
        'item2': '64',
        'item3': '73',
        'item4': '65',
        'item5': '75',
        'item6': '0',
        'item7': '0',
        'max': '75',
        'max_index': '5',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-2.png'
    },
    {
        'item1': '63',
        'item2': '64',
        'item3': '73',
        'item4': '65',
        'item5': '75',
        'item6': '0',
        'item7': '0',
        'max': '75',
        'max_index': '5',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-2.png'
    },
    {
        'item1': '36',
        'item2': '51',
        'item3': '38',
        'item4': '52',
        'item5': '47',
        'item6': '0',
        'item7': '0',
        'max': '52',
        'max_index': '4',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-3.png'
    },
    {
        'item1': '36',
        'item2': '51',
        'item3': '38',
        'item4': '52',
        'item5': '47',
        'item6': '0',
        'item7': '0',
        'max': '52',
        'max_index': '4',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-3.png'
    },
    {
        'item1': '23',
        'item2': '17',
        'item3': '16',
        'item4': '22',
        'item5': '27',
        'item6': '0',
        'item7': '0',
        'max': '27',
        'max_index': '5',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-4.png'
    },
    {
        'item1': '23',
        'item2': '17',
        'item3': '16',
        'item4': '22',
        'item5': '27',
        'item6': '0',
        'item7': '0',
        'max': '27',
        'max_index': '5',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-4.png'
    },
    {
        'item1': '50',
        'item2': '58',
        'item3': '43',
        'item4': '52',
        'item5': '53',
        'item6': '0',
        'item7': '0',
        'max': '58',
        'max_index': '2',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-5.png'
    },
    {
        'item1': '50',
        'item2': '58',
        'item3': '43',
        'item4': '52',
        'item5': '53',
        'item6': '0',
        'item7': '0',
        'max': '58',
        'max_index': '2',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-5.png'
    },
    {
        'item1': '24',
        'item2': '26',
        'item3': '25',
        'item4': '18',
        'item5': '16',
        'item6': '0',
        'item7': '0',
        'max': '26',
        'max_index': '2',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-6.png'
    },
    {
        'item1': '24',
        'item2': '26',
        'item3': '25',
        'item4': '18',
        'item5': '16',
        'item6': '0',
        'item7': '0',
        'max': '26',
        'max_index': '2',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-6.png'
    },
    {
        'item1': '63',
        'item2': '74',
        'item3': '77',
        'item4': '59',
        'item5': '78',
        'item6': '0',
        'item7': '0',
        'max': '78',
        'max_index': '5',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-7.png'
    },
    {
        'item1': '63',
        'item2': '74',
        'item3': '77',
        'item4': '59',
        'item5': '78',
        'item6': '0',
        'item7': '0',
        'max': '78',
        'max_index': '5',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-7.png'
    },
    {
        'item1': '80',
        'item2': '91',
        'item3': '94',
        'item4': '86',
        'item5': '87',
        'item6': '0',
        'item7': '0',
        'max': '94',
        'max_index': '3',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-8.png'
    },
    {
        'item1': '80',
        'item2': '91',
        'item3': '94',
        'item4': '86',
        'item5': '87',
        'item6': '0',
        'item7': '0',
        'max': '94',
        'max_index': '3',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-8.png'
    },
    {
        'item1': '77',
        'item2': '67',
        'item3': '91',
        'item4': '86',
        'item5': '74',
        'item6': '0',
        'item7': '0',
        'max': '91',
        'max_index': '3',
        'graphFlag': '1',
        'size': '5',
        'img': 'graph-5-9.png'
    },
    {
        'item1': '77',
        'item2': '67',
        'item3': '91',
        'item4': '86',
        'item5': '74',
        'item6': '0',
        'item7': '0',
        'max': '91',
        'max_index': '3',
        'graphFlag': '0',
        'size': '5',
        'img': 'number-5-9.png'
    },
    {
        'item1': '40',
        'item2': '41',
        'item3': '28',
        'item4': '26',
        'item5': '30',
        'item6': '32',
        'item7': '38',
        'max': '41',
        'max_index': '2',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-0.png'
    },
    {
        'item1': '40',
        'item2': '41',
        'item3': '28',
        'item4': '26',
        'item5': '30',
        'item6': '32',
        'item7': '38',
        'max': '41',
        'max_index': '2',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-0.png'
    },
    {
        'item1': '39',
        'item2': '24',
        'item3': '35',
        'item4': '38',
        'item5': '31',
        'item6': '20',
        'item7': '16',
        'max': '39',
        'max_index': '1',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-1.png'
    },
    {
        'item1': '39',
        'item2': '24',
        'item3': '35',
        'item4': '38',
        'item5': '31',
        'item6': '20',
        'item7': '16',
        'max': '39',
        'max_index': '1',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-1.png'
    },
    {
        'item1': '33',
        'item2': '29',
        'item3': '28',
        'item4': '26',
        'item5': '20',
        'item6': '15',
        'item7': '24',
        'max': '33',
        'max_index': '1',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-2.png'
    },
    {
        'item1': '33',
        'item2': '29',
        'item3': '28',
        'item4': '26',
        'item5': '20',
        'item6': '15',
        'item7': '24',
        'max': '33',
        'max_index': '1',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-2.png'
    },
    {
        'item1': '58',
        'item2': '70',
        'item3': '61',
        'item4': '68',
        'item5': '67',
        'item6': '60',
        'item7': '66',
        'max': '70',
        'max_index': '2',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-3.png'
    },
    {
        'item1': '58',
        'item2': '70',
        'item3': '61',
        'item4': '68',
        'item5': '67',
        'item6': '60',
        'item7': '66',
        'max': '70',
        'max_index': '2',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-3.png'
    },
    {
        'item1': '47',
        'item2': '39',
        'item3': '48',
        'item4': '42',
        'item5': '50',
        'item6': '44',
        'item7': '56',
        'max': '56',
        'max_index': '7',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-4.png'
    },
    {
        'item1': '47',
        'item2': '39',
        'item3': '48',
        'item4': '42',
        'item5': '50',
        'item6': '44',
        'item7': '56',
        'max': '56',
        'max_index': '7',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-4.png'
    },
    {
        'item1': '25',
        'item2': '12',
        'item3': '13',
        'item4': '10',
        'item5': '21',
        'item6': '26',
        'item7': '19',
        'max': '26',
        'max_index': '6',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-5.png'
    },
    {
        'item1': '25',
        'item2': '12',
        'item3': '13',
        'item4': '10',
        'item5': '21',
        'item6': '26',
        'item7': '19',
        'max': '26',
        'max_index': '6',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-5.png'
    },
    {
        'item1': '34',
        'item2': '24',
        'item3': '28',
        'item4': '39',
        'item5': '26',
        'item6': '30',
        'item7': '40',
        'max': '40',
        'max_index': '7',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-6.png'
    },
    {
        'item1': '34',
        'item2': '24',
        'item3': '28',
        'item4': '39',
        'item5': '26',
        'item6': '30',
        'item7': '40',
        'max': '40',
        'max_index': '7',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-6.png'
    },
    {
        'item1': '66',
        'item2': '54',
        'item3': '57',
        'item4': '55',
        'item5': '53',
        'item6': '50',
        'item7': '60',
        'max': '66',
        'max_index': '1',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-7.png'
    },
    {
        'item1': '66',
        'item2': '54',
        'item3': '57',
        'item4': '55',
        'item5': '53',
        'item6': '50',
        'item7': '60',
        'max': '66',
        'max_index': '1',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-7.png'
    },
    {
        'item1': '43',
        'item2': '30',
        'item3': '35',
        'item4': '40',
        'item5': '52',
        'item6': '36',
        'item7': '31',
        'max': '52',
        'max_index': '5',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-8.png'
    },
    {
        'item1': '43',
        'item2': '30',
        'item3': '35',
        'item4': '40',
        'item5': '52',
        'item6': '36',
        'item7': '31',
        'max': '52',
        'max_index': '5',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-8.png'
    },
    {
        'item1': '64',
        'item2': '62',
        'item3': '51',
        'item4': '54',
        'item5': '55',
        'item6': '69',
        'item7': '56',
        'max': '69',
        'max_index': '6',
        'graphFlag': '1',
        'size': '7',
        'img': 'graph-7-9.png'
    },
    {
        'item1': '64',
        'item2': '62',
        'item3': '51',
        'item4': '54',
        'item5': '55',
        'item6': '69',
        'item7': '56',
        'max': '69',
        'max_index': '6',
        'graphFlag': '0',
        'size': '7',
        'img': 'number-7-9.png'
    }
];
/*

templateParameters = [{
  'item1': '77',
  'item2': '82',
  'item3': '92',
  'item4': '0',
  'item5': '0',
  'item6': '0',
  'item7': '0',
  'max': '92',
  'max_index': '3',
  'graphFlag': '1',
  'size': '3',
  'img': 'graph-3-0.png'
  },
  {
  'item1': '77',
  'item2': '82',
  'item3': '92',
  'item4': '0',
  'item5': '0',
  'item6': '0',
  'item7': '0',
  'max': '92',
  'max_index': '3',
  'graphFlag': '0',
  'size': '3',
  'img': 'number-3-0.png'
  },
  {
  'item1': '37',
  'item2': '32',
  'item3': '40',
  'item4': '0',
  'item5': '0',
  'item6': '0',
  'item7': '0',
  'max': '40',
  'max_index': '3',
  'graphFlag': '1',
  'size': '3',
  'img': 'graph-3-1.png'
  },
  {
  'item1': '37',
  'item2': '32',
  'item3': '40',
  'item4': '0',
  'item5': '0',
  'item6': '0',
  'item7': '0',
  'max': '40',
  'max_index': '3',
  'graphFlag': '0',
  'size': '3',
  'img': 'number-3-1.png'
  },
  {
  'item1': '45',
  'item2': '39',
  'item3': '30',
  'item4': '0',
  'item5': '0',
  'item6': '0',
  'item7': '0',
  'max': '45',
  'max_index': '1',
  'graphFlag': '1',
  'size': '3',
  'img': 'graph-3-2.png'
  },
  {
  'item1': '45',
  'item2': '39',
  'item3': '30',
  'item4': '0',
  'item5': '0',
  'item6': '0',
  'item7': '0',
  'max': '45',
  'max_index': '1',
  'graphFlag': '0',
  'size': '3',
  'img': 'number-3-2.png'
}]

*/
const imageFiles = {
    'graph-3-0.png': 'embedded\u002F1ab1cfab622ed534a872b015853f819d6016d8a327c5c26457141345bd816d01.png',
    'graph-3-1.png': 'embedded\u002F9f6c7368f2e2c3794c602ba0cff376603678d1182e01f15f357e244e3a624124.png',
    'graph-3-2.png': 'embedded\u002Ff5fea2f74b7b90eb7394de9d1c828bc1f8758b51a6e1a7088c657c0cc8ffadef.png',
    'graph-3-3.png': 'embedded\u002Fc88442c0bcd733be29ec2eca30a09011691cb4449a449c4eef28dd4bacb14c47.png',
    'graph-3-4.png': 'embedded\u002F2e57101520d75ab4c78bb7d38f3b8e442c9fac27afd97c2be2ec0727b5e6f358.png',
    'graph-3-5.png': 'embedded\u002Fff8ce88f28343ffa2de3d19772b476d269fcb06cd04c8229fcc2bc1b4df12445.png',
    'graph-3-6.png': 'embedded\u002F2651469cfc70dba1f0671c8aebac8be7927da4229fbfbd6258d2f424454efa17.png',
    'graph-3-7.png': 'embedded\u002F724658bda33cccdae49a2ccab8da4ece6c06225f341aca08841d566784a2fadf.png',
    'graph-3-8.png': 'embedded\u002Fd55bc7d1eea23def455a10c2da42cab64f0845f34b5a848ddc8269e9465d8ebc.png',
    'graph-3-9.png': 'embedded\u002F315ecd9d740376c95d6dc994960b148f7d8ea31159c53c71d5355ca6d0729b61.png',
    'graph-5-0.png': 'embedded\u002Fa41300f070947f8d859ca32642a86c3b1dcc4893a866d026bd7a6fc23746f3e5.png',
    'graph-5-1.png': 'embedded\u002F785c84b0661964e15d406fa120c3947e8107ecdcc4649e9e07158ec50949bcbe.png',
    'graph-5-2.png': 'embedded\u002F99cdfa3816931cb2476490ae3c67d20f8f861655a1d14cc4f55a4aa327bc29e9.png',
    'graph-5-3.png': 'embedded\u002Fced88ca116de8ad88aa70c922cc1d20295ecb74b51572e50faddf30d5d3fe5b0.png',
    'graph-5-4.png': 'embedded\u002Fe1e738060e831bd9e5280195c73030be93cad58e1fc87874510158b5870116a2.png',
    'graph-5-5.png': 'embedded\u002F2a706333b7d6dd7c87f5cf6ab6d7611e8e8b21026013a55e31a3dd8135e79777.png',
    'graph-5-6.png': 'embedded\u002F55c521e848e9b4c8ba38344453f2a33d8fc4727dc7c5c00c0c33bf701756a115.png',
    'graph-5-7.png': 'embedded\u002F6ccf8ee62ed1e46b7c67a88ee726e20927543c866cc6ff08fd58844f6379841f.png',
    'graph-5-8.png': 'embedded\u002F6558211cbccc40f2839f314f27b5cbfaec501bb1424074c359fb4239fee4b58f.png',
    'graph-5-9.png': 'embedded\u002Fa81e40d780f79bac6dce743e66fa7f157589ae9a1a7457d1b2c38bebd1091bf9.png',
    'graph-7-0.png': 'embedded\u002F5753787c2cfb7894e7cee6082a4186cf8d8d3e9a53ce12233db705ef566f20d9.png',
    'graph-7-1.png': 'embedded\u002F7ec0e46544a8d7cee86bef53aab75b19c3e9b79608e32254ab954b96758491f5.png',
    'graph-7-2.png': 'embedded\u002F36e05684cab1e139d79260b2df6f64dde4398e0100de2e9368765edf7750c1f5.png',
    'graph-7-3.png': 'embedded\u002F41afadb354afd02ae889c86211682835244582d1e710d6d60b8d106f073c9f56.png',
    'graph-7-4.png': 'embedded\u002F6d121bc6f61e28eee7c0d5b948dfbba8e97f4fb409691de853fd297a245d690c.png',
    'graph-7-5.png': 'embedded\u002Fcc8abafb916fb50015180e3cda0904c8292c74383a6b19888523bd42bc0e5b2e.png',
    'graph-7-6.png': 'embedded\u002F1a6e9a2d351f4756cbe7a505cb67bffd010bc68e9bbae2827b1a61ff5f0f0eef.png',
    'graph-7-7.png': 'embedded\u002F4d6a5e98021dc766ca4ab5f9d32c6b6dc9cc414056196fca92c478ec87244944.png',
    'graph-7-8.png': 'embedded\u002F32a3b2b054b1eee2cdcf0ff8cbab8d141573e527350a441df4d835a10a10af0f.png',
    'graph-7-9.png': 'embedded\u002Fa05ac94accf20039b65ea9756c6a7ab741aee4ab5f0f19deeb19e6e10cd6c1dd.png',
    'number-3-0.png': 'embedded\u002Fdea7eef9ca351f10051c939f0e950d7bc7e008c5c1072c3c4d70700c66bebcbf.png',
    'number-3-1.png': 'embedded\u002F8ff18d0118922a5db5d9152b2928d709e7e05849ab79b72fdca16c7b444346ea.png',
    'number-3-2.png': 'embedded\u002F2375e630f3454d3469a1fcb9eb424ac3f3425cdf9d26f0ed3f05a76dd2bfb7d9.png',
    'number-3-3.png': 'embedded\u002F5c7ba7664988a5301c929055909916ebd4a3fc82d1fa6977bf7c9cb3ed171c3c.png',
    'number-3-4.png': 'embedded\u002F1acd539768b6f0778dbac8cf6cfcb5b9d1e8c714f66a127ac46b1e788b0382cc.png',
    'number-3-5.png': 'embedded\u002F24be96aed9938ad6401a4f2d581ed91992238906324e49922144d90cce73e63d.png',
    'number-3-6.png': 'embedded\u002F444d16fdcc8a226ea0221562a54e1972505a048d981bf95fd801fe1a19a304cc.png',
    'number-3-7.png': 'embedded\u002F1e4f16811062a65225126d95e5cd06fbcd2d9fccde31f3b960c8fa80e73d430c.png',
    'number-3-8.png': 'embedded\u002Fed30a45a9869d61ba531b2912f9965ef04bbc0af321cf04f21205933554bc4f3.png',
    'number-3-9.png': 'embedded\u002F018dcc44577a63cb4983e09f7bf3e2d435f1ff30b783e17578a20b541d53f46a.png',
    'number-5-0.png': 'embedded\u002Ff0d5841f147aa0f042986124dfc112648374e5b9593edc3396e57e32ff4199ae.png',
    'number-5-1.png': 'embedded\u002F3e5b550275a81d7c9a4c35722658238115023092936e165d94ff0e73ab216e8e.png',
    'number-5-2.png': 'embedded\u002F8e884f8a900957dd1f99af0c12fd502b570d2aa62c0d794edeb915e2a7625ada.png',
    'number-5-3.png': 'embedded\u002F3f26e135b18abd9904c099c082b9156dc44d1e94876814fb888b3a7c77c75913.png',
    'number-5-4.png': 'embedded\u002F1c96fa35bcf8e7bb1d400dc3c2c8b26c01891c2254073ee6818ad235f7d6095e.png',
    'number-5-5.png': 'embedded\u002F367ef22acb0242e6d759fa04e56630cfe7ec1c8ebfd6fed9eb1e4dcd017c386f.png',
    'number-5-6.png': 'embedded\u002Fa7ce8a73e4d24909e0aae94b38743180ef14226935b251a9ca9adef5b10b21bb.png',
    'number-5-7.png': 'embedded\u002Fc72557bc3ac19c658b6c0cf8b28c4a39213c72cfc53317abe31407c4e41be9f8.png',
    'number-5-8.png': 'embedded\u002F0b2edaa9eb89f00f1246d6ac3a60c3347f4c6e5f0ed40b149d9e8c3be664bde0.png',
    'number-5-9.png': 'embedded\u002F568ce9a5ab50751d439b812dd222ff2304fb304a6fbee5a2839395e810cfa418.png',
    'number-7-0.png': 'embedded\u002F333b1110b027dd789486a375058b10faa5d327ccf4d2d3b60a573bb9ecf868ed.png',
    'number-7-1.png': 'embedded\u002F2639b6b0077ec6133345a9e3da9088bef22bdb53bc7ddaf0090d0437ee5f7461.png',
    'number-7-2.png': 'embedded\u002F525c9d2e5d60b9d7d5a5d59dcd45b114ee4d9f90b5b049282387599f9eaa5fcd.png',
    'number-7-3.png': 'embedded\u002F582800b4d55a322a04b1997e9a88e109b08c31b9fb3ffd2bda629ecb23c7e168.png',
    'number-7-4.png': 'embedded\u002F8481d088f5604b7f91b3e1672fb924529f65f20328854aeaed74e8420e634c37.png',
    'number-7-5.png': 'embedded\u002Fc1cc9ac072170e2641a14191d26bf04c1b26fafc8cf22c047098713f4d6e2589.png',
    'number-7-6.png': 'embedded\u002Fa858e0a10a1bbf1722622d512b182b6cc4e87456a719621cdd50b67d0ae20e3d.png',
    'number-7-7.png': 'embedded\u002F1a130661dfe8d1f3791c308b02d9323dfd76ddd1d2a2b6817034d1515e4218ce.png',
    'number-7-8.png': 'embedded\u002F0baea7206c78ba483f824dff07f18febc0ad7597d8a0f9881bf5a2a639cab144.png',
    'number-7-9.png': 'embedded\u002Fbcaa00feab750dc9e9f2b7a814717d07191777bc41e3ed870cfeff83f3a7fc8d.png'
};
const teaching = new lab.util.fromObject({
    'type': 'lab.html.Page',
    'title': '教示',
    'datacommit': false,
    'items': [
        {
            'type': 'text',
            'title': 'もっとも大きなデータ要素を探す実験',
            'content': '\u003Cp\u003E本日は実験にご協力いただきありがとうございます！\u003C\u002Fp\u003E\n\n\u003Cp\u003E実験では、画面内のどこかに横に並んだ「数字」か「棒グラフ」が表示されます。その中でもっとも大きいデータ要素（最も値の大きな数値か棒）をクリックしてください。\u003C\u002Fp\u003E\n\n\u003Csmall\u003E（タッチパネル液晶をお使いの場合は指タップでも実験可能ですが、画面の小さいスマホは使わないでください）\u003C\u002Fsmall\u003E\n\n\u003Cp\u003E選択はなるべく速く、そしてなるべく正確に行ってください。\u003C\u002Fp\u003E\n\n\u003Cp\u003E毎回、判断していただく画面に先立ち、画面の中央に「＋」、下の方に「クリックしてスタート」という文字がある画面が提示されます。\u003C\u002Fp\u003E\n\n\u003Cp\u003E毎回必ず「＋」に視線を置いた上、「クリックしてスタート」を押して実験を始めてください。指タップでももちろん可能です。\n\u003Cul\u003E\n\u003Cli\u003Eマウスボタン（指）の押し下げではなく、離したとき（mouse-up）に実験が始まります。\n\u003Cli\u003Eですので、マウスを押し下げた上で「＋」に視線を合わせてからマウスボタンを離して実験を始めるとスムーズです。\n\u003C\u002Ful\u003E\n\n\u003Cp\u003E判断いただく数字やグラフは全部で60組となります。すぐ終わると思います。\u003C\u002Fp\u003E\n\n\u003Cp\u003Eそれでは準備ができたら右の「実験を始める」をクリックして実験を始めてください。\u003C\u002Fp\u003E\n\u003Cp\u003Eよろしくお願いします！\u003C\u002Fp\u003E'
        }
    ],
    'scrollTop': true,
    'submitButtonText': '実験を始める',
    'submitButtonPosition': 'right',
    'files': {},
    'responses': {
        '': ''
    },
    'parameters': {},
    'messageHandlers': {}
});
const fixationCross = new lab.util.fromObject({
    'type': 'lab.canvas.Screen',
    'title': 'Fixation Cross',
    'datacommit': false,
    'content': [
        {
            'type': 'i-text',
            'left': 0,
            'top': 0,
            'angle': 0,
            'width': 18.69,
            'height': 36.16,
            'stroke': null,
            'strokeWidth': 1,
            'fill': 'black',
            'text': '+',
            'fontStyle': 'normal',
            'fontWeight': 'normal',
            'fontSize': 32,
            'fontFamily': 'sans-serif',
            'lineHeight': 1.16,
            'textAlign': 'center'
        },
        {
            'type': 'i-text',
            'left': 0,
            'top': 250,
            'angle': 0,
            'width': 108,
            'height': 43.93,
            'stroke': null,
            'strokeWidth': 1,
            'fill': 'black',
            'text': 'クリックして\nスタート',
            'fontStyle': 'normal',
            'fontWeight': 'normal',
            'fontSize': '18',
            'fontFamily': 'sans-serif',
            'lineHeight': 1.16,
            'textAlign': 'center'
        },
        {
            'type': 'aoi',
            'left': 0,
            'top': 250,
            'angle': 0,
            'width': 128,
            'height': 80,
            'stroke': null,
            'strokeWidth': 1,
            'fill': 'rgba(0, 0, 0, 0.2)',
            'label': 'btn_start'
        }
    ],
    'files': {},
    'responses': {
        'mouseup @btn_start': 'start'
    },
    'parameters': {},
    'messageHandlers': {}
});
const stimulusResponse = () => {
    const aoi = (target, offset) => {
        return {
            'type': 'aoi',
            'left': -332 + 83 * (target + offset),
            'top': 13,
            'angle': 0,
            'width': 65,
            'height': 350,
            'stroke': null,
            'strokeWidth': 1,
            'fill': 'rgba(0, 0, 0, 0.2)',
            'label': target
        };
    };
    const rect = (target, offset) => {
        return {
            'type': 'rect',
            'left': -332 + 83 * (target + offset),
            'top': 13,
            'angle': 0,
            'width': 65,
            'height': 350,
            'stroke': null,
            'strokeWidth': 1,
            'fill': 'rgba(0, 0, 0, 0.5)',
            'label': target
        };
    };
    let stimulus = new lab.util.fromObject({
        'type': 'lab.canvas.Screen',
        'title': 'Stimulus + Response',
        'content': [
            {
                'type': 'image',
                'left': 0,
                'top': 0,
                'angle': 0,
                'width': 600,
                'height': 400,
                'stroke': null,
                'strokeWidth': 0,
                'fill': 'black',
                'src': '${ this.files[parameters.img] }',
                'autoScale': false
            },
            // aoi(1),
            // aoi(2),
            // aoi(3),
            // aoi(4),
            // aoi(5),
            // aoi(6),
            // aoi(7)
        ],
        'files': imageFiles,
        'responses': {
            'click @1': '1',
            'click @2': '2',
            'click @3': '3',
            'click @4': '4',
            'click @5': '5',
            'click @6': '6',
            'click @7': '7'
        },
        'parameters': {
            'disp_x': 0,
            'disp_y': 0
        },
        'messageHandlers': {
            'before:prepare': function () {
                let options = this.options;
                let contents = options.content;
                const aggregateParameters = this.aggregateParameters;
                // 正解
                options.correctResponse = aggregateParameters.max_index;
                // aoiを動的に追加する
                const offset = (7 - aggregateParameters.size) / 2;
                for (let i = 0; i < 7; i++) {
                    let offset = (7 - aggregateParameters.size) / 2;
                    if (i >= aggregateParameters.size) {
                        offset = -999;
                    }
                    contents.push(aoi(i + 1, offset));
                    // contents.push(rect(i+1, offset))
                }
                // 表示位置をランダムにする
                const width = document.documentElement.clientWidth - 600;
                const height = document.documentElement.clientHeight - 400;
                const x = (getRandomInt(width) - width / 2) * 0.6;
                const y = (getRandomInt(height) - height / 2) * 0.6;
                contents.forEach(function (element) {
                    element.left += x;
                    element.top += y;
                });
                this.options.parameters.disp_x = x;
                this.options.parameters.disp_y = y;
            },
            'run': function () {
                const canvas = document.getElementsByTagName('canvas')[0];
                console.log(canvas);
            }
        }
    });
    return stimulus;
};
const closing = new lab.util.fromObject({
    'type': 'lab.html.Page',
    'title': 'データDL指示・御礼',
    'datacommit': false,
    'items': [
        {
            'type': 'text',
            'title': 'お疲れ様でした！',
            'content': '右の「データダウンロード」を押して、CSVファイルを保存してください。\n\n\u003Cbr\u003E\u003Cbr\u003Eデータは研究以外の目的には使用しません。またこのCSVファイルには個人が特定できるデータは含まれていません。実験にご協力いただきありがとうございました！'
        }
    ],
    'scrollTop': true,
    'submitButtonText': 'データダウンロード',
    'submitButtonPosition': 'right',
    'files': {},
    'responses': {
        '': ''
    },
    'parameters': {},
    'messageHandlers': {},
    'events': {
        'click button': function () {
            this.options.datastore.download();
        }
    }
});
// Define the sequence of components that define the study
const template = new lab.flow.Sequence({
    'content': [
        fixationCross,
        stimulusResponse()
    ],
    'shuffle': false
});
const experiment = new lab.flow.Sequence({
    datastore: new lab.data.Store(),
    content: [
        teaching,
        new lab.flow.Loop({
            'title': '繰り返し（実験パラメータ）',
            'templateParameters': templateParameters,
            'template': template,
            'shuffle': true
        }),
        closing
    ]
});
experiment.run();
