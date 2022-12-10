using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.Networking;
using System.Runtime.InteropServices;

public class Testttt : MonoBehaviour
{
    
    public GameObject t;
    Dictionary<string, float> dict = new Dictionary<string, float>();
    string poses="leftEyeX=328.5787"; 

    void Start()
    {        
        
    }
    
    void Update()
    {
        string[] subPoses=poses.Split("=");
        dict[subPoses[0]]=float.Parse(subPoses[1]);
        t.GetComponent<TMP_Text>().text=dict["leftEyeX"].ToString();
    }
}