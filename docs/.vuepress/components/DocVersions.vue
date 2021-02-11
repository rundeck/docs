<template>
	
	<label>
	Version:

		<select onchange="if(this.value){document.location=this.value}">
			<option value="" >-Select-</option>
			<optgroup :label="group.label" v-for="group in versions" :key="group.label">
			<option v-for="vers in group.values" :value="docsbase+'/'+vers" :key="vers">{{vers}}</option>
			</optgroup>
		</select>
		        
            
            </select>
	</label>
</template>

<script>
const docsBase= "https://docs.rundeck.com"
//include the last version in each minor release
const previousDocsVersions= [
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
