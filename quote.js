
//javascript for the quotes
var theQuotes = new Array() // do not change this


theQuotes[0] = 'It is estimated that within 100 years there will be no rainforest.'
theQuotes[1] = "There is more carbon dioxide in the atmosphere today than at any point in the last 800,000 years."
theQuotes[2] = "One and a half acres of forest is cut down every second."
theQuotes[3] = 'Loss of forests contributes between 12 and 17 percent of annual global greenhouse gas emissions'
theQuotes[4] = 'If the current rate of deforestation continues, it will take less than 100 years to destroy all the rainforests on earth'
theQuotes[5] = 'The rate of deforestation equals to loss of 20 football fields every minute'
theQuotes[6] = 'There are more than 121 natural remedies in the rain forest which can be used as medicines'
theQuotes[7] = 'Up to 28,000 species are expected to become extinct by the next quarter of the century due to deforestation'
theQuotes[8] = 'The total world forest loss till date is 7.3 million hectares per year'
theQuotes[9] = 'Soil erosion, floods, wildlife extinction, increase in global warming, and climate imbalance are few of the effects of deforestation'
theQuotes[10] = 'A lot of paper and cardboard is used unnecesarily for packing'
theQuotes[11] = "Tropical rainforests which cover 6-7% of the earth's surface, contain over half of all the plant and animal species in the world!"
theQuotes[12] = "Half of the world's tropical forests has already been cleared."
theQuotes[13] = "4500 acres of forests are cleared every hour by forest fires, bull dozers, machetes etc."
theQuotes[14] = 'Emmissions like carbon dioxide, nitrous oxide and other greenhouse gases will remain in the atmosphere for many years making it impossible to eliminate global warming for several decades'
theQuotes[15] = 'The last two decades of the 20th century have been the hottest in the last 400 years, according to climate studies'
theQuotes[16] = 'Due to global warming and pollution, coral reefs are suffering the worst bleaching with the highest dying record since 1980'
theQuotes[17] = 'Humans are emitting more carbon dioxide in the atmosphere, faster than the absorbing rates of plants and the oceans'
theQuotes[18] = 'Since 1870, global sea levels have risen by about 8 inches.'
theQuotes[19] = '2001 to 2010 was the warmest decade recorded since 1850.'

// ======================================
// do not change anything below this line
// ======================================
//
//var j = 0;
//var p = theQuotes.length;
//var url;



//var preBuffer = new Array()
//for (i = 0; i < p; i++){
   //preBuffer[i]	 = theQuotes[i]
//}

//var whichQuote = Math.round(Math.random()*(p-1));



function showQuote(){
document.write('<div class="quote animated fadeInUp"><p>' +theQuotes[whichImage]+ '</p></div>');
}



showQuote();



