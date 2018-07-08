//
//  ViewController.swift
//  NGO
//
//  Created by Abhinandan Bedi on 07/07/18.
//  Copyright © 2018 Abhinandan Bedi. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController {

    @IBOutlet weak var webView: WKWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let url = URL(string: "https://ssksolution.herokuapp.com/")!
        webView.load(URLRequest(url: url))
        webView.allowsBackForwardNavigationGestures = true
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func appointmentButton(_ sender: Any) {
    }
    
}

