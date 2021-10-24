import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';

import { Button, Surface } from "@react-native-material/core";
import data from "./data.json";

export default function App() {
  var dataAsArray=data;
  const[curI, setCurI]=useState(0);
  const[latI, setLatI]=useState(0);
  return (
    <View style={styles.container}>
      <FrageAnzeigen curI={curI}/>
      <Surface style={{ width: 300, height: 50, textAlign: "center" }}/>
      {
        dataAsArray.questions[curI] && dataAsArray.questions[curI].antworten.map((element, idx) => {
            return (
               <AntwortAnzeigen id={idx} key={idx} setCurI={setCurI} curI={curI} latI={latI} setLatI={setLatI}/>
              )
            }
        )
      }
      {
      curI>687750 && dataAsArray.text[curI-687750] && <TextAnzeigen id={curI}/>
      }
      <Surface style={{ width: 300, height: 50, textAlign: "center" }}/>
      <ZurückKnopf latI={latI} setCurI={setCurI}/>
      <StatusBar style="light" />
    </View>
  );
}

const FrageAnzeigen=(props)=>{
  var dataAsArray=data;
  if(props.curI<687750){  
    return(
     <Text style={styles.Frage}>
          {dataAsArray.questions[props.curI].frage}
        </Text>
    );
  }else {
    return(<></>);
  }
}
const AntwortAnzeigen=(props)=>{
  var dataAsArray=data;
  return(
  <><Text
      style={styles.Antwort}
      onPress={() => {
        props.setLatI(props.curI);
        props.setCurI(dataAsArray.questions[props.curI].links[props.id]);
      } }
    >
      {dataAsArray.questions[props.curI].antworten[props.id]}
    </Text>
    <Surface style={{ width: 300, height: 5, textAlign: "center" }}/></>
  );
}
const TextAnzeigen=(props)=>{
  var dataAsArray=data;
  console.log(props.id)

  return(
    <>
            {
              dataAsArray.text[props.id-687750] && 
              dataAsArray.text[props.id-687750].content.map(element => {
                return(
                  <Text key={element} style={styles.TextColor}>{`\u2022 ${element}\n`}</Text>
                )
              })
            }
    </>
  );
}
const ZurückKnopf=(props)=>{
  if(props.curI==0){
    return(<></>);
  } else{
    return(
    <><View>
        <Text
        style={styles.ZurückKnopf}
          onPress={() => {
          props.setCurI(props.latI);
          }}
      >Zurück</Text>
      </View></>
    )
  }
}


const styles = StyleSheet.create({
  Frage:{
    alignItems: "center",
    justifyContent: "center",
    textAlign:'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    width: 300,
    height: 50,
    color: 'black',
    backgroundColor: "#52d1ff",
    fontSize: 30
  },

  Antwort: {
    alignItems: "center",
    justifyContent: "center",
    textAlign:'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    width: 300,
    height: 50,
    color: 'black',
    backgroundColor: "#52d1ff",
    fontSize: 15
  },

  TextColor: {
    color: 'white',
  },

  container: {
    flex: 1,
    backgroundColor: '#1b2229',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Text:{
    fontSize: 20,
    color: "white"
  },

  ZurückKnopf:{
    alignItems: "center",
    justifyContent: "center",
    textAlign:'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    width: 300,
    height: 50,
    color: 'black',
    backgroundColor: "#52d1ff",
    fontSize: 25
  }
});
