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

float getVoxelValueFromSampler(sampler2D sampler, vec3 p, float dz){
	if(dz < 1.0/4.0)
		return texture2D(sampler, (p.xy)).r;
	if(dz < 2.0/4.0)
		return texture2D(sampler, (p.xy)).g;
	if(dz < 3.0/4.0)
		return texture2D(sampler, (p.xy)).b;
	else
		return texture2D(sampler, (p.xy)).a;
}


float getVoxel(vec3 p){
	if(p.z < 1.0/9.0){
		float dz = (p.z - 0.0/9.0) * 9.0;
		return getVoxelValueFromSampler(sampler2d0, p, dz);
	}
	if(p.z < 2.0/9.0){
		float dz = (p.z - 1.0/9.0) * 9.0;
		return getVoxelValueFromSampler(sampler2d1, p, dz);
	}
	if(p.z < 3.0/9.0){
		float dz = (p.z - 2.0/9.0) * 9.0;
		return getVoxelValueFromSampler(sampler2d2, p, dz);
	}
	if(p.z < 4.0/9.0){
		float dz = (p.z - 3.0/9.0) * 9.0;
		return getVoxelValueFromSampler(sampler2d3, p, dz);
	}
	if(p.z < 5.0/9.0){
		float dz = (p.z - 4.0/9.0) * 9.0;
		return getVoxelValueFromSampler(sampler2d4, p, dz);
	}
	if(p.z < 6.0/9.0){
		float dz = (p.z - 5.0/9.0) * 9.0;
		return getVoxelValueFromSampler(sampler2d5, p, dz);
	}
	if(p.z < 7.0/9.0){
		float dz = (p.z - 6.0/9.0) * 9.0;
		return getVoxelValueFromSampler(sampler2d6, p, dz);
	}
	if(p.z < 8.0/9.0){
		float dz = (p.z - 7.0/9.0) * 9.0;
		return getVoxelValueFromSampler(sampler2d7, p, dz);
	}
	else{
		float dz = (p.z - 8.0/9.0) * 9.0;
		return getVoxelValueFromSampler(sampler2d8, p, dz);
	}
	//return getVoxelValueFromSampler(sampler2d3, p, p.z);
}
bool cerebro(float value)
{
  float min = 50.0/256.0;
  float max = 90.0/256.0;
  float v = (value-min)/(max-min);
  if (value>min && value<=max)
   return true;
  return false;
}

bool osso(float value)
{
  float min = 120.0/256.0;
  float max = 200.0/256.0;
  float v = (value-min)/(max-min);
  if (value>min && value<=max)
   return true;
  return false;
}

float transferenceAlpha(float value)
{
  if (cerebro(value))
   return 0.005;
	if (osso(value))
		return 0.003;
  return 0.001;
}

vec3 transferenceColor(float value)
{
	if (cerebro(value))
   return vec3(1.0,0.0,0.0);
	if (osso(value))
		return vec3(0.0,1.0,0.0);
  return vec3(1.0,1.0,1.0);
}

void main (void)
{
  vec3 _enterPoint = enterPoint*0.5 + 0.5;
	vec3 camDir = normalize(_enterPoint - camPos);
  vec3 p = _enterPoint;
  float delta = 0.001;
	float opacidade = 0.0;
	vec4 cor = vec4(0.0);
  while (p.z <= 1.0 && p.x >= 0.0 && p.x <= 1.0 && p.y>=0.0 && p.y<=1.0)
  {
		opacidade += transferenceAlpha(getVoxel(p))*(1-opacidade);	 
		cor.rbg += transferenceColor(getVoxel(p)*transferenceAlpha(getVoxel(p)) *(1-opacidade));

			
   		p += delta*camDir;
  }

  gl_FragColor.xyz =cor.xyz;
  gl_FragColor.a  = opacidade;
}