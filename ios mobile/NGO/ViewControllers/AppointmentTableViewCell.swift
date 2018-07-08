//
//  AppointmentTableViewCell.swift
//  NGO
//
//  Created by Abhinandan Bedi on 08/07/18.
//  Copyright © 2018 Abhinandan Bedi. All rights reserved.
//

import UIKit

class AppointmentTableViewCell: UITableViewCell {

    @IBOutlet weak var doctorName: UILabel!
    @IBOutlet weak var patientName: UILabel!
    
    @IBOutlet weak var timing: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
