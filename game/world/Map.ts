///<reference path='../Game.ts' />

module world {
	
	export class Map {
		canvas:HTMLCanvasElement;
		context:CanvasRenderingContext2D;
		data:ImageData;
		pixels:any; // Uint8ClampedArray or number[], it seems nobody can make their mind up
		
		get width():number {
			return this.canvas.width;
		}
		get height():number {
			return this.canvas.height;
		}
		
		constructor(canvas:HTMLCanvasElement) {
			this.canvas = canvas;
			this.context = canvas.getContext('2d');
			this.data = this.context.createImageData(canvas.width, canvas.height);
			this.pixels = this.data.data;
		}
		
		// you need to call this after you're done drawing, else your changes won't be displayed.
		render():void {
			this.context.putImageData(this.data, 0, 0);
		}
		
		setPixel(x:number, y:number, r:number = 0, g:number = 0, b:number = 0, a:number = 255):void {
			var i = 4 * (x + y * this.width);
			this.pixels[i] = r;
			this.pixels[i + 1] = g;
			this.pixels[i + 2] = b;
			this.pixels[i + 3] = a;
		}
		
		clearPixel(x:number, y:number):void {
			var i = 4 * (x + y * this.width);
			this.pixels[i] = 0;
			this.pixels[i + 1] = 0;
			this.pixels[i + 2] = 0;
			this.pixels[i + 3] = 0;
		}
		
		getPixel(x:number, y:number):[number,number,number,number] {
			var i = 4 * (x + y * this.width);
			var r = this.pixels[i];
			var g = this.pixels[i + 1];
			var b = this.pixels[i + 2];
			var a = this.pixels[i + 3];
			return [r, g, b, a];
		}
		
		isSolid(x:number, y:number):boolean {
			var i = 4 * (x + y * this.width);
			var a = this.pixels[i + 3];
			return a != 0;
		}
	}
}