using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class test : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
        WebCamTexture webcamTexture = new WebCamTexture();
        // Renderer renderer = GetComponent<Renderer>();
        Renderer rend = this.GetComponentInChildren<Renderer>();
        rend.material.mainTexture = webcamTexture;
        webcamTexture.Play();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
