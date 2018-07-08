//
//  SocialWorkerMainViewController.swift
//  NGO
//
//  Created by Abhinandan Bedi on 07/07/18.
//  Copyright © 2018 Abhinandan Bedi. All rights reserved.
//

import UIKit

class SocialWorkerMainViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    let categories = ["Upcoming Apointments", "Booking Apointments", "Patient Profiles", "Doctor Profiles", "Appointments Archive", "Requests"]
    @IBOutlet weak var tableView: UITableView!
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(SocialWorkerMainViewTableViewCell.self, forCellReuseIdentifier: "SocialWorkerMainViewTableViewCell")
        let nib = UINib(nibName: "SocialWorkerMainViewTableViewCell", bundle: nil)
        tableView.register(nib, forCellReuseIdentifier: "SocialWorkerMainViewTableViewCell")
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
        return 6
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "SocialWorkerMainViewTableViewCell") as! SocialWorkerMainViewTableViewCell
        cell.categoriesLabel.text = categories[indexPath.row]
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
    }

}
