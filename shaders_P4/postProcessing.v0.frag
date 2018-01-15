#version 330 core

//Color de salida
out vec4 outColor;

//Variables Variantes
in vec2 texCoord;

//Textura
uniform sampler2D colorTex;

//Blur
uniform float blur;

void main()
{
//Código del Shader
float bl=blur;
outColor = vec4(texture(colorTex, texCoord).rgb, bl);

//outColor = vec4(texCoord,vec2(1.0)); //Exclusivamente para depurar

//Para hacerlo mas eficiente
//vec4(texelFetch(colorTex,ivec2(gl_FragCoord.xy),0).rgb,0); accede tectura, coordenadas de fragmento, nivel

}