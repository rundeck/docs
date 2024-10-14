<template>

	<label>
	Version:
		<select onchange="if(this.value){document.location=this.value}">
			<option value="" >-Select-</option>
			<optgroup :label="group.label" v-for="group in versions" :key="group.label">
			<option v-for="vers in group.values" :value="docsbase+'/'+vers" :key="vers">{{vers}}</option>
			</optgroup>
		</select>
	</label>
</template>

<script>
const docsBase= "https://docs.rundeck.com"
//include the last version in each minor release
const previousDocsVersions= [
  "5.6.1",
  "5.6.0",
  "5.5.0",
  "5.4.0",
  "5.3.0",
  "5.2.0",
  "5.1.2",
  "5.1.1",
  "5.1.0",
  "5.0.2",
  "5.0.1", 	
  "5.0.0",
  "4.17.6",
  "4.17.5",
  "4.17.4",
  "4.17.3",
  "4.17.2",  
  "4.17.1",
  "4.17.0",
  "4.16.0",
  "4.15.0",
  "4.14.2",
  "4.14.1",
  "4.14.0",
  "4.13.0",
  "4.12.1",
  "4.12.0",
  "4.11.0",
  "4.10.2",
  "4.10.1",
  "4.10.0",
  "4.9.0",
  "4.8.0",
	"4.7.0",
	"4.6.1",
	"4.5.0",
	"4.4.0",
	"4.3.0",
	"4.2.0",
	"4.1.0",
	"4.0.0",
	"3.4.10",
	"3.3.9",
	"3.2.9",
	"3.1.3",
	"3.0.27",
	"2.11.14",
	"2.10.8",
	"2.9.2",
	"2.8.4",
	"2.7.3",
	"2.6.11",
	"2.5.3",
	"2.4.2",
	"2.3.2",
	"2.2.3",
	"2.1.3",
	"2.0.4"
]
let versarr=[]
//parse versions to create groups of options
for(let a in previousDocsVersions){
	let b = previousDocsVersions[a]
	let match=b.match(/^(\d+\.\d+)\.(\d+)$/)
	let minor=match[1]
	let count=parseInt(match[2])
	let strings=[]
	for(let i=count;i>=0;i--){
		strings.push(minor+`.${i}`)
	}
	versarr.push({label:minor,values:strings})

}
export default {
	data(){
		return {
			versions: versarr,
			docsbase: docsBase
		}
	},

}
</script>
