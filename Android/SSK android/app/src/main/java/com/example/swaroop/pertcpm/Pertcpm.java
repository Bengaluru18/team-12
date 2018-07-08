package com.example.swaroop.pertcpm;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Array;
import java.util.ArrayList;

/**
 * Created by swaroop on 2/13/2018.
 */

public class Pertcpm extends AppCompatActivity {

    EditText activityName,maxTime,minTime,department;
    ListView listView;
    Button submit;




    int minTimeNeeded=0;
    int maxTimeNeeded=0;

    DatabaseReference databaseReference = FirebaseDatabase.getInstance().getReferenceFromUrl("https://pertcpm-fb5ec.firebaseio.com/pertcpm");
    String ListofActivityString;
    JSONArray ListofActivityArray=new JSONArray();
    ArrayList<String> activityNameList =new ArrayList<>();



    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pertcpm);


        activityName =(EditText)findViewById(R.id.activitytext);
        department =(EditText)findViewById(R.id.departmenttext);
        minTime =(EditText)findViewById(R.id.minday);
        maxTime =(EditText)findViewById(R.id.maxday);

        listView =(ListView)findViewById(R.id.listview);
        submit=(Button)findViewById(R.id.submit);



        final ArrayAdapter arrayAdapter = new ArrayAdapter(this,android.R.layout.simple_list_item_1,activityNameList);


        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                ListofActivityString=(String)dataSnapshot.getValue(String.class);
                try{
                ListofActivityArray = new JSONArray(ListofActivityString);
                    try {
                        Log.d("errorlen",String.valueOf(ListofActivityString.length()));
                        for (int i = 0; i < ListofActivityArray.length(); i++) {
                            JSONObject jsonObject = new JSONObject();
                            try{
                            jsonObject = ListofActivityArray.getJSONObject(i);
                                activityNameList.add(jsonObject.getString("activityName"));
                            }catch (Exception e){};

                        }
                        arrayAdapter.notifyDataSetChanged();
                    }
                    catch (Exception e){
                        Log.d("errorsinpert1",e.toString());
                    }
                    Log.d("errorinpert2",ListofActivityString);
                //Toast.makeText(Pertcpm.this,ListofActivityArray.toString(),Toast.LENGTH_SHORT).show();

                }catch (Exception e){
                    Log.d("errorsinpert3",e.toString());
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });



        listView.setAdapter(arrayAdapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                try {
                    Log.d("errorpert77",ListofActivityString.toString());
                    Log.d("errorpert66",String.valueOf(i));
                    JSONObject jsonObject=ListofActivityArray.getJSONObject(i);
                    Log.d("errorpert22",jsonObject.toString());
                    //Toast.makeText(Pertcpm.this,String.valueOf(Integer.valueOf(jsonObject.getInt("maxTime"))),Toast.LENGTH_SHORT).show();
                    if(minTimeNeeded<jsonObject.getInt("minTime")){
                        minTimeNeeded=jsonObject.getInt("minTime");
                        Log.d("errorpert33",jsonObject.toString());
                    }

                    if( maxTimeNeeded<jsonObject.getInt("maxTime")){
                        maxTimeNeeded=jsonObject.getInt("maxTime");
                        Log.d("erropert44",String.valueOf(maxTime));
                    }


                } catch (JSONException e) {
                    e.printStackTrace();
                }
                Toast.makeText(Pertcpm.this,activityNameList.get(i)+" set as prereqisite",Toast.LENGTH_SHORT).show();
            }
        });

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {



                JSONObject jsonObject =new JSONObject();
                try {

                    jsonObject.put("activityName",activityName.getText().toString());
                    jsonObject.put("maxTime",Integer.valueOf(minTime.getText().toString())+maxTimeNeeded);
                    jsonObject.put("minTime",Integer.valueOf(maxTime.getText().toString())+minTimeNeeded);
                    jsonObject.put("department",department.getText().toString());
                    ListofActivityArray.put(jsonObject);

                    databaseReference.setValue(ListofActivityArray.toString());
                    Log.d("errorpert",ListofActivityArray.toString());

                    AlertDialog.Builder alert = new AlertDialog.Builder(Pertcpm.this);

                    alert.setTitle("Activity Estimated Time");
                    alert.setMessage( "Activity name : "+activityName.getText().toString()+" Days"+'\n'+
                                      "MaxTime needed : "+String.valueOf(jsonObject.getInt("maxTime"))+" Days"+'\n'+
                                      "MinTime needed :"+String.valueOf(jsonObject.getInt("minTime"))+" Days"+'\n'+
                                      "Average Time needed :"+ String.valueOf((int)(jsonObject.getInt("minTime")+jsonObject.getInt("maxTime"))/2)+" Days"
                    );
                    AlertDialog alertDialog  = alert.create();

                    alertDialog.show();

                } catch (JSONException e) {
                    e.printStackTrace();
                    Log.d("errorpert",e.toString());
                }
            }
        });






    }
}
