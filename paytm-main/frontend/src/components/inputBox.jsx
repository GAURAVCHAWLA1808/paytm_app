export function InputBox({label, placeholder,onChange,value,readOnly=false}) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input placeholder={placeholder} onChange={onChange} value={value}
        readOnly={readOnly}  className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
    
}
import React from 'react';


