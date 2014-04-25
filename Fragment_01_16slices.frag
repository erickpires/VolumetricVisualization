varying vec3 enterPoint;
varying vec3 camPos;
uniform sampler2D sampler2d0;  
uniform sampler2D sampler2d1;  
uniform sampler2D sampler2d2; 
uniform sampler2D sampler2d3; 
uniform sampler2D sampler2d4;  
uniform sampler2D sampler2d5;  
uniform sampler2D sampler2d6;  
uniform sampler2D sampler2d7;  
uniform sampler2D sampler2d8;  


bool corteperpendicular (int eixo, float c1, float c2, vec3 coord_texture){
// 1 = eixo x , 2 = eixo y, 3 = eixo z
   if(eixo == 1){
     if (coord_texture.x < c1)
       return true;
     if (coord_texture.x > c2)
       return true;
    }
   if(eixo == 2){
     if (coord_texture.y < c1)
       return true;
     if (coord_texture.y > c2)
       return true;
    }
   if(eixo == 3){
     if (coord_texture.z < c1)
       return true;
     if (coord_texture.z > c2)
       return true;
    }

	return false;
}

bool corteobliquo (float a,float b,float c,float d,vec3 p,int lado){

// equacao do plao é ax + by + cz + d = 0 e p sao as coordenadas
//lado = 0, colocamos no if ">", os pontos acima do plano sao descartados
//lado = 1, colocamos no if "<", os pontos abaixo do plano sao descartados

if(lado == 0){
  if(p.x*(a) + p.y*(b) + p.z*(c) + d > 0.)
     return true;
    }
else{
  if(p.x*(a) + p.y*(b) + p.z*(c) + d < 0.)
     return true;
    }
	return false;
}

vec2 verificaQuadrante (int quadrante,vec2 coord_texture){ 

//quadrantes em relaçao a foto original
//recebe as coordenadas e ajusta elas pro quadrante que a gente precisa
	coord_texture *= 0.5;

  if(quadrante == 1){
    coord_texture.x = coord_texture.x + 0.5;  	
   }

  if(quadrante == 2){
   

   }
  if(quadrante == 3){
    coord_texture.y = coord_texture.y + 0.5;
   }
  if(quadrante == 4){
		 coord_texture.x = coord_texture.x + 0.5;
    coord_texture.y = coord_texture.y + 0.5;
   }

	 return coord_texture;
}

vec2 chooseImage(sampler2D sampler, vec2 point, float dz){
	vec2 actual_point;
	if(dz < 1.0/4.0){
		actual_point = verificaQuadrante(3, point);
	}
	else if(dz < 2.0/4.0){
		actual_point = verificaQuadrante(2, point);	
	}
	else if(dz < 3.0/4.0){
		actual_point = verificaQuadrante(1, point);

	}
	else{
		actual_point = verificaQuadrante(4, point);
		
	}
	return actual_point;
}


float getVoxelValueFromSampler(sampler2D sampler, vec2 p, float dz){
	float _dz;
	vec2 point;
	if(dz < 1.0/4.0){
		_dz = (dz - 0.0/4.0) * 4.0;	
		point = chooseImage(sampler, p, _dz);
		return texture2D(sampler, point).r;
	}
	if(dz < 2.0/4.0){
		_dz = (dz - 1.0/4.0) * 4.0;
		point = chooseImage(sampler, p, _dz);
		return texture2D(sampler, point).g;
		//return 0.0;
	}
	if(dz < 3.0/4.0){
		_dz = (dz - 2.0/4.0) * 4.0;
		point = chooseImage(sampler, p, _dz);
		return texture2D(sampler, point).b;
		//return 0.0;
	}
	else{
		_dz = (dz - 3.0/4.0) * 4.0;
		point = chooseImage(sampler, p, _dz);
		return texture2D(sampler, point).a;
		//return 0.0;
	}
}


float getVoxel(vec3 p){
	if(p.z < 1.0/7.0){
		float dz = (p.z - 0.0/7.0) * 7.0;
		return  getVoxelValueFromSampler(sampler2d0, p.xy, dz);
	}
	if(p.z < 2.0/7.0){
		float dz = (p.z - 1.0/7.0) * 7.0;
		return getVoxelValueFromSampler(sampler2d1, p.xy, dz);
	}
	if(p.z < 3.0/7.0){
		float dz = (p.z - 2.0/7.0) * 7.0;
		return getVoxelValueFromSampler(sampler2d2, p.xy, dz);
	}
	if(p.z < 4.0/7.0){
		float dz = (p.z - 3.0/7.0) * 7.0;
		return getVoxelValueFromSampler(sampler2d3, p.xy, dz);
	}
	if(p.z < 5.0/7.0){
		float dz = (p.z - 4.0/7.0) * 7.0;
		return getVoxelValueFromSampler(sampler2d4, p.xy, dz);
	}
	if(p.z < 6.0/7.0){
		float dz = (p.z - 5.0/7.0) * 7.0;
		return getVoxelValueFromSampler(sampler2d5, p.xy, dz);
	}
	else{
		float dz = (p.z - 6.0/7.0) * 7.0;
		return getVoxelValueFromSampler(sampler2d6, p.xy, dz);
	}
	//return getVoxelValueFromSampler(sampler2d3, p, p.z);
}
bool cerebro(float value)
{

	//float min = 50.0/256.0;
  //float max = 90.0/256.0;
  float min = 82.5/256.0;
  float max = 100.0/256.0;
  float v = (value-min)/(max-min);
  if (value>min && value<=max)
   return true;
  return false;
}

bool carne(float value){
	float min = 65.0/256.0;
  float max = 81.0/256.0;
  float v = (value-min)/(max-min);
  if (value>min && value<=max)
   return true;
  return false;
}

bool osso(float value)
{
  float min = 100.0/256.0;
  float max = 240.0/256.0;
  float v = (value-min)/(max-min);
  if (value>min && value<=max)
   return true;
  return false;
}

float transferenceAlpha(float value, vec3 p)
{

	//if(corteperpendicular(1, 0.2, 0.4, p) || corteperpendicular(3, 0.0, 0.4, p) || corteperpendicular(2, 0.3, 1.0, p))
	//	return 0.0;
	if(corteobliquo(-0.16,0.09,0.14,-0.05, p, 1))
		return 0.0;
	if(carne(value))
		return 0.005;
  if (cerebro(value))
   return 0.006;
	if (osso(value))
		return 0.011;
  return 0.0;
}

vec3 transferenceColor(float value)
{
	if(carne(value))
		return vec3(1.0,0.0,0.0);
	if (cerebro(value))
   return vec3(0.0,1.0,0.0);
	if (osso(value))
		return vec3(1.0,1.0,1.0);
  return vec3(1.0,1.0,1.0);
}

void main (void)
{
  vec3 _enterPoint = enterPoint*0.5 + 0.5;
	vec3 camDir = normalize(_enterPoint - camPos);
  vec3 p = _enterPoint;
  float delta = 0.001;
	float opacidade = 0.0;
	vec3 cor = vec3(0.0);
  while (p.z <= 1.0 && p.x >= 0.0 && p.x <= 1.0 && p.y>=0.0 && p.y<=1.0)
  {

		opacidade += transferenceAlpha(getVoxel(p), p)*(1-opacidade);	
		cor += transferenceColor(getVoxel(p))*transferenceAlpha(getVoxel(p), p)*(1-opacidade);
		 
			
   		p += delta*camDir;
  }

  gl_FragColor.rgb =cor.rgb;
  gl_FragColor.a  = opacidade;
}