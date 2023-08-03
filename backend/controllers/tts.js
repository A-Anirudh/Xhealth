import gTTS from "gtts";
import PDFParser from "pdf2json";

const pdfParser = new PDFParser(this,1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    
    let speech = pdfParser.getRawTextContent();
    const  gtts = new gTTS(speech, 'en');


    gtts.save('Voice.mp3', function (err, result){
        if(err) { throw new Error(err); }
        console.log("Text to speech converted!");
    });
});

pdfParser.loadPDF("C:/Users/Anirudh/Downloads/sample.pdf");

