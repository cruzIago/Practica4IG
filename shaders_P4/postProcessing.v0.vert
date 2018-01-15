#version 330 core
//Vamos a recibir una textura y la pegaremos en la pantalla completamente

layout(location=0) in vec3 inPos;

//Variables Variantes
out vec2 texCoord;


void main()
{
//C�digo del Shader
texCoord = inPos.xy*0.5+vec2(0.5);//Primero multiplico y luego sumo. Es m�s rapido pues es como el procesador cicla(multiplicaciones, luego sumas)
		//inPos.xy-vec2(-1.0)*0.5;  Como el ciclo de reloj multiplica y luego suma, es ir� un poco m�s lento

gl_Position = vec4 (inPos,1.0);
}
