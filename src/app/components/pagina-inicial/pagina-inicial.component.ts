import { Component, OnInit } from '@angular/core';

import { UploadService } from '../../services/upload.service';
import { pollyStruct } from '../../models/polly';
import { ConsumirApisService } from '../../services/consumir-apis.service'

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  //public src = "https://bucket-reservi.s3.us-east-2.amazonaws.com/sorry-convertido.pdf";
  public src = '';
  public nombrePDF = '';

  public estadoTextArea: boolean = false;
  public estadoPdf: boolean = false;

  public idiomas: string[] = ['Español', 'Ingles'];
  public vocesEspaniol: string[] = ['Lucia', 'Conchita', 'Enrique'];
  public vocesIngles: string[] = ['Salli', 'Joanna', 'Ivy', 'Kendra', 'Kimberly', 'Matthew', 'Justin', 'Joey'];

  public tipoVoz: boolean = true;

  public verSeleccion: string        = this.idiomas[0];
  public verVoz: string        = this.vocesEspaniol[0];

  public textArea: string = '';

  public rutaSonido: string = "";

  public obtenerSonidoStruct: pollyStruct ={
    text :  '',
    voice : ''
  } 
  
  // VARIABLE PARA GUARDAR EL ARCHIVO
  toFile;
  constructor(private subirPDF: UploadService, private consumirApi: ConsumirApisService) { }

  ngOnInit(): void {
  }

  public getUrlPDF(): string{
    return this.src;
  }

  public mostrarTextArea(): void{
    this.estadoTextArea = true;
    this.estadoPdf = false;
  }

  public mostrarPdf(): void{
    this.estadoPdf = true;
    this.estadoTextArea = false;
  }

  capturarIdioma(idioma: string) {
    this.verSeleccion = idioma;
    if(idioma === this.idiomas[0]){
      this.tipoVoz = true;
      this.verVoz = this.vocesEspaniol[0];
    }else{
      this.tipoVoz = false;
      this.verVoz = this.vocesIngles[0];
    }
  }

  capturarVoz(voz: string) {
    this.verVoz= voz;
  }

  // METODO PARA OBTENER EL ARCHIVO
  onChange(event){
    console.log('ENTRES')
    this.toFile = event.target.files;

    const file = this.toFile.item(0);
    const nombre = this.numHex()+file.name;
    this.subirPDF.fileUpload(file,nombre);
    console.log(nombre)
    this.src = `https://semi1-proyectoclase.s3.us-east-2.amazonaws.com/${nombre}`;
    this.nombrePDF = nombre;
  }

  // METODO PARA GENERAR UN NUMERO RANDOM HEX
  private numHex(): string{
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');  
    return genRanHex(16);
  }

  public ObtenerSonido(){
    if(this.estadoPdf){
      this.consumirApi.ObtenerTexto(this.nombrePDF).subscribe( (res:any)=>{
        this.obtenerSonidoStruct.text = res.texto
        this.obtenerSonidoStruct.voice = this.verVoz;
        this.reproducir();
      }, error=>{
        console.log(error);
      })
    }
    else{
      this.obtenerSonidoStruct.text = this.textArea;
      this.obtenerSonidoStruct.voice = this.verVoz;
      this.reproducir();
    }

  }

  public ObtenerTexto(){
    
  }

  reproducir(){
    this.consumirApi.ObtenerVoz(this.obtenerSonidoStruct).subscribe( (res: any)=>{
      this.rutaSonido = `https://semi1-proyectoclase.s3.us-east-2.amazonaws.com/${res.ruta}`;
      console.log( this.rutaSonido);
      const audio = new Audio(this.rutaSonido);
      audio.play();
    },error =>{
      console.log(error);
    });
  }
}
