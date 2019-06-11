

const decToFrac = (dec) => {

    // console.log(dec);

    let whole = Math.floor(parseFloat(dec));
    let parts = parseFloat(dec) - whole; 

    

    if(parts !== 0){
        switch (parts.toFixed(2)) {

            case "0.25": {
              return `${whole !== 0 ? whole : ''} \u00BC`
            }
            case "0.50": {
              return `${whole !== 0 ? whole : ''} \u00BD`
            }
            case "0.75": {
              return `${whole !== 0 ? whole : ''} \u00BE`
            }
            case "0.33": {
                return `${whole !== 0 ? whole : ''} \u2153`
            }
            case "0.67": {
                return `${whole !== 0 ? whole : ''} \u2154`
            }
            case "0.13": {
                return `${whole !== 0 ? whole : ''} \u215B`
            }
            default:
              return dec
          }
    } else {
        return dec
    }

  
}

export default decToFrac;