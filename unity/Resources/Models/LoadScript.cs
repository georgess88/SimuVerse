using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.Networking;
using System.Runtime.InteropServices;

public class LoadScript : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void GetExternalJS();
    [DllImport("__Internal")]
    private static extern string getPoses();

    private string sceneName="";
    public GameObject t;
    Dictionary<string, float> dict = new Dictionary<string, float>();

    void Start()
    {        
        GetExternalJS();
        // setup();
        // Invoke("setup", 10.0f);
        // draw();
        int pm = Application.absoluteURL.IndexOf("?");
        if (pm != -1)
        {
            sceneName = Application.absoluteURL.Split("?"[0])[1];
            string[] subParams=sceneName.Split("&");
            string modelType=subParams[0].Split("=")[1];
            string urlString=subParams[1].Split("=")[1];
            t.GetComponent<TMP_Text>().text=urlString;
            GameObject gb = Resources.Load("Models/"+modelType) as GameObject;
            GameObject g=GameObject.Instantiate(gb);
            StartCoroutine(GetTexture(g,urlString));
        }
        // GameObject g1=GameObject.Instantiate(gob);
        // StartCoroutine(GetTexture(g1));
    }

    IEnumerator GetTexture(GameObject g, string urlImage) {
        UnityWebRequest www = UnityWebRequestTexture.GetTexture(urlImage);
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success) {
            Debug.Log(www.error);
        }
        else {
            Texture myTexture = ((DownloadHandlerTexture)www.downloadHandler).texture;
            g.transform.gameObject.GetComponent<Renderer>().material.mainTexture = myTexture;
            g.transform.gameObject.GetComponent<Renderer>().material.mainTextureScale=new Vector2(0.001f, 0.001f);
            g.transform.gameObject.GetComponent<Renderer>().material.SetTextureOffset("_MainTex", new Vector2(2.37f, -0.39f));
            // g.transform.gameObject.GetComponent<Renderer>().material.mainTextureScale=new Vector2(-2, -2);
            // g.transform.gameObject.GetComponent<Renderer>().material.SetTextureOffset("_MainTex", new Vector2(4.94f, 0.97f));
        }
    }

    // Update is called once per frame
    void Update()
    {
        t.GetComponent<TMP_Text>().text="";
        string[] poses=getPoses().Split(",");
        for(int i=0;i<poses.Length;i++)
        {
            string[] subPoses=poses[i].Split("=");
            dict[subPoses[0]]=float.Parse(subPoses[1]);
        }
        t.GetComponent<TMP_Text>().text=dict["noseY"].ToString();
    }
}
