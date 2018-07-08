//
//  LoginViewController.swift
//  NGO
//
//  Created by Abhinandan Bedi on 07/07/18.
//  Copyright © 2018 Abhinandan Bedi. All rights reserved.
//

import UIKit
import Firebase
import SwiftyJSON
import FirebaseDatabase
import SVProgressHUD

class LoginViewController: UIViewController {
    
    var nextViewController = ""
   
    @IBOutlet weak var selectedSegment: UISegmentedControl!
    @IBAction func segmentChanged(_ sender: Any) {
        switch selectedSegment.selectedSegmentIndex {
        case 0:
            nextViewController = "Doctor"
        case 1: nextViewController = "Receptionist"
        default:
            break
        }
    }
    
    @IBOutlet weak var passwordLabel: UITextField!
    @IBOutlet weak var usernameLabel: UITextField!
    var arrRes = [[String:AnyObject]]()


    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = UIColor(patternImage: UIImage(named: "village.jpg")!)
        // Git commit test
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func loginButtonPressed(_ sender: Any) {
//        if(self.nextViewController == "Receptionist"){
//            let vc = self.storyboard?.instantiateViewController(withIdentifier: "Reception") as! ReceptionViewController
//            self.present(vc, animated: true, completion: nil)
        SVProgressHUD.show(withStatus: "Logging In")
        var ref: DatabaseReference!
        ref = Database.database().reference()

        ref.child("login").child(self.usernameLabel.text!).child("type").observeSingleEvent(of: .value, with: { (snapshot) in
            // Get user value
        print(snapshot.value!)
            if(snapshot.value! as! String == "receptionist"){
                SVProgressHUD.dismiss()
                let vc = self.storyboard?.instantiateViewController(withIdentifier: "Reception") as! ReceptionViewController
                self.present(vc, animated: true, completion: nil)
            }
            else if(snapshot.value! as! String == "sw"){
                SVProgressHUD.dismiss()
                let vc = self.storyboard?.instantiateViewController(withIdentifier: "SocialWorker") as! UITabBarController
                self.present(vc, animated: true, completion: nil)
                
            }
            
           
        })

    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    }
}
