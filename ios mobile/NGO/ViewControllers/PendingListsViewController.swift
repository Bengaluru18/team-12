//
//  PendingListsViewController.swift
//  NGO
//
//  Created by Abhinandan Bedi on 08/07/18.
//  Copyright © 2018 Abhinandan Bedi. All rights reserved.
//

import UIKit
import FirebaseDatabase
import Firebase

class PendingListsViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    @IBOutlet weak var tableView: UITableView!
    var benificiaryData: [String] = ["pat1","pat2","pat3","pat4"]
    var timingsData: [String] = ["8-3-18", "9-4-18", "3-5-18", "4-4-18"]

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(PendingListTableViewCell.self, forCellReuseIdentifier: "PendingListTableViewCell")
        let nib = UINib(nibName: "PendingListTableViewCell", bundle: nil)
        tableView.register(nib, forCellReuseIdentifier: "PendingListTableViewCell")
        // Do any additional setup after loading the view.
//        var ref: DatabaseReference!
//        ref = Database.database().reference()
//        
//        ref.child("appointments").observeSingleEvent(of: .value, with: { (snapshot) in
//            for child in snapshot.children {
//                let snap = child as! DataSnapshot
//                let key = snap.key
//                let value = snap.value
//                if(snap.value(forKey: "is_approved") as! Int == 0){
//                    self.benificiaryData.append(snap.value(forKey: "beneficiaries_id") as! String)
//                    self.timingsData.append(snap.value(forKey: "beneficiaries_id") as! String)
//                }
//                print("key = \(key)  value = \(value!)")
//                self.tableView.reloadData()
//            }
//            
//            
//        })
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return benificiaryData.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "PendingListTableViewCell") as! PendingListTableViewCell
        cell.benificiaryIdLabel.text = self.benificiaryData[indexPath.row]
        cell.timingsLabel.text = self.timingsData[indexPath.row]
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 90.0
    }

}
