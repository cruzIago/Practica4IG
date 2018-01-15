#version 330 core
#define MASK_SIZE 25u

//Color de salida
out vec4 outColor;

//Variables Variantes
in vec2 texCoord;

//Textura
uniform sampler2D colorTex;

const float maskFactor = float (1.0/65.0); //Para evitar añadir energia en la mascara

//Pixeles donde aplicar la mascara 
const vec2 texIdx[MASK_SIZE] = vec2[](
	vec2(-2.0,2.0), vec2(-1.0,2.0), vec2(0.0,2.0), vec2(1.0,2.0), vec2(2.0,2.0),
	vec2(-2.0,1.0), vec2(-1.0,1.0), vec2(0.0,1.0), vec2(1.0,1.0), vec2(2.0,1.0),
	vec2(-2.0,0.0), vec2(-1.0,0.0), vec2(0.0,0.0), vec2(1.0,0.0), vec2(2.0,0.0),
	vec2(-2.0,-1.0), vec2(-1.0,-1.0), vec2(0.0,-1.0), vec2(1.0,-1.0), vec2(2.0,-1.0),
	vec2(-2.0,-2.0), vec2(-1.0,-2.0), vec2(0.0,-2.0), vec2(1.0,-2.0), vec2(2.0,-2.0)
		);

//Mascara de convolucion o kernel. Aplicamos los valores. Los centrales 2 y las esquinas 1

const float mask[MASK_SIZE] = float[](
	1.0*maskFactor, 2.0*maskFactor, 3.0*maskFactor,2.0*maskFactor, 1.0*maskFactor,
	2.0*maskFactor, 3.0*maskFactor, 4.0*maskFactor,3.0*maskFactor, 2.0*maskFactor,
	3.0*maskFactor, 4.0*maskFactor, 5.0*maskFactor,4.0*maskFactor, 3.0*maskFactor,
	2.0*maskFactor, 3.0*maskFactor, 4.0*maskFactor,3.0*maskFactor, 2.0*maskFactor,
	1.0*maskFactor, 2.0*maskFactor, 3.0*maskFactor,2.0*maskFactor, 1.0*maskFactor
		);

void main(){

//Sería más rápido utilizar una variable uniform el tamaño de la textura.
vec2 ts = vec2(1.0) / vec2 (textureSize (colorTex,0)-vec2(1.0));

vec4 color = vec4 (0.0);

for (uint i = 0u; i < MASK_SIZE; i++){
	vec2 iidx = texCoord + ts * texIdx[i];//Calculo el incremento en coordenadas de pixel para calcular los adyacentes
	color += texture(colorTex, iidx,0.0) * mask[i];
}

outColor = color;

}
