//
//  AppointmentsViewController.swift
//  NGO
//
//  Created by Abhinandan Bedi on 08/07/18.
//  Copyright © 2018 Abhinandan Bedi. All rights reserved.
//

import UIKit
import FirebaseDatabase
import Firebase

class AppointmentsViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var tableView: UITableView!
    var patientData: [String] = ["pat1","pat2","pat3","pat4"]
    var timingData: [String] = ["8-3-18", "9-4-18", "3-5-18", "4-4-18"]
    var doctorData: [String] = ["doc1","doc2","doc3","doc4"]

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(AppointmentTableViewCell.self, forCellReuseIdentifier: "AppointmentTableViewCell")
        let nib = UINib(nibName: "AppointmentTableViewCell", bundle: nil)
        tableView.register(nib, forCellReuseIdentifier: "AppointmentTableViewCell")
        // Do any additional setup after loading the view.
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
        return patientData.count
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 100.0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "AppointmentTableViewCell") as! AppointmentTableViewCell
        cell.patientName.text = self.patientData[indexPath.row]
        cell.doctorName.text = self.doctorData[indexPath.row]
        cell.timing.text = self.timingData[indexPath.row]
        return cell
    }

}
